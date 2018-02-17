const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const logger = require('../logger/logger');

passport.serializeUser(( user, done ) => {
    done(null, user.id);
});

passport.deserializeUser(( id, done ) => {
    User.findById(id)
        .then(user => done(null, user));
});

const keys = require('../config/keys');

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID || keys.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET || keys.CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async ( accessToken, refreshToken, profile, done ) => {

        let googleId = profile.id;
        logger.info('Looking for user with googleId: ' + googleId);

        const existingUser = await User.findOne({ googleId });
        if ( existingUser ) {
            logger.info('User found');
            return done(null, existingUser);
        }

        logger.info('No user found, creating a new user');
        const newUser = await new User({ googleId, createdAt: new Date().getTime() }).save();
        return done(null, newUser);
    })
);
