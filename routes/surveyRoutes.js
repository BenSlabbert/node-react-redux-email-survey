const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
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

            const survey = await new Survey({
                title,
                body,
                subject,
                recipients: recipients.split(',').map(email => ({ email: email.trim() })),
                _user: req.user.id,
                dateSent: Date.now()
            }).save();

            const mailer = new Mailer(survey, surveyTemplate(survey));
            mailer.send();
        });
};
