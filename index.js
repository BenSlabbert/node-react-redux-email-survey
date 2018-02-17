const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if ( !CLIENT_ID || !CLIENT_SECRET ) {
    throw new Error("No OAuth Credentials Provided");
}

app.listen(PORT);
