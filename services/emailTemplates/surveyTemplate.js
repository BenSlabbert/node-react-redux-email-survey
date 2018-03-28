const keys = require('../../config/keys');

/**
 * Takes a survey object, which must have a body defined
 * @param survey
 * @returns {string}
 */
module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.EMAIL_SURVEY_REDIRECT_DOMAIN}/api/surveys/${survey.id}/yes">Yes</a>
                        <a href="${keys.EMAIL_SURVEY_REDIRECT_DOMAIN}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};
