const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
const logger = require('../logger/logger');

module.exports = app => {
    app.get('/api/surveys/thanks', ( req, res ) => {
        logger.info('Click event thanks');
        res.send('thanks for voting!');
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
