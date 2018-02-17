const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.CLIENT_ID,
    clientSecret: keys.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, ( accessToken, refreshToken, profile, done ) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    console.log('done', done);
}));

app.get('/auth/google',
    passport.authenticate('google', {
        // the info we want from google
        scope: [ 'profile', 'email' ]
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log('Server running at: ' + PORT);
