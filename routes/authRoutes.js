const passport = require('passport');
const logger = require('../logger/logger');

module.exports = ( app ) => {
    app.get('/auth/google',
        passport.authenticate('google', {
            // the info we want from google
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google'),
        ( req, res ) => {
            logger.info('User logged in, redirecting');
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', ( req, res ) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', ( req, res ) => {
        res.send(req.user);
    });
};
