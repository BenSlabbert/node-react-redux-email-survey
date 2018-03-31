const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
const logger = require('../logger/logger');

module.exports = app => {

    /**
     * user must be logged in
     * get a list of surveys for the user
     **/
    app.get('/api/surveys',
        requireLogin,
        async ( req, res ) => {
            const surveys = await Survey.find({ _user: req.user.id })
                .select({ recipients: false }) // exclude this field
                .sort({ dateSent: -1 });
            res.send(surveys);
        });

    /**
     * Give some feedback to the user after they have voted
     */
    app.get('/api/surveys/:surveyId/:choice', ( req, res ) => {
        logger.info('Click event thanks');
        res.send('thanks for voting!');
    });

    /**
     * handle webhook POST request from SendGrid
     */
    app.post('/api/surveys/webhooks', ( req, res ) => {

        const pathHelper = new Path('/api/surveys/:surveyId/:choice');
        console.log('request from SendGrid', req.body);
        _.chain(req.body)
            .map(( { email, url } ) => {
                const match = pathHelper.test(new URL(url).pathname);
                if (match) return { email, surveyId: match.surveyId, choice: match.choice };
            })
            .compact() // removing undefined events
            .uniqBy('email', 'surveyId') // remove duplicates
            .each(( { choice, email, surveyId } ) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true }
                }).exec();
            })
            .value();

        res.send({});
    });

    /**
     * user must be logged in
     * user must have enough credits
     **/
    app.post(
        '/api/surveys',
        requireLogin,
        requireCredits,
        async ( req, res ) => {
            const { title, subject, body, recipients } = req.body;

            const survey = new Survey({
                title,
                body,
                subject,
                recipients: recipients.split(',').map(email => ({ email: email.trim() })),
                _user: req.user.id,
                dateSent: Date.now()
            });

            try {
                logger.info('Creating Mailer');
                const mailer = new Mailer(survey, surveyTemplate(survey));
                await mailer.send();

                await survey.save();

                logger.info('Sent email, updating user credits');
                req.user.credits -= 1;
                const user = await req.user.save();
                res.send(user);
            } catch (e) {
                logger.error(e);
                res.status(422).send(e);
            }
        });
};
