const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

let keys;
if ( process.env.PROFILE === 'dev' ) {
    keys = require('../config/keys');
}

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID || keys.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET || keys.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, ( accessToken, refreshToken, profile, done ) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    console.log('done', done);
}));
