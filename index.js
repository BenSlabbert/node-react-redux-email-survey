const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.CLIENT_ID,
    clientSecret: keys.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, accessToken => {
    console.log(accessToken);
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
