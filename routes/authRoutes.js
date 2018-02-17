const passport = require('passport');

module.exports = ( app ) => {
    app.get('/auth/google',
        passport.authenticate('google', {
            // the info we want from google
            scope: [ 'profile', 'email' ]
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));
};
