const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger/logger');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

// declare the model before mongoose needs it
require('./models/User');

logger.info('Setting up Passport');
require('./services/passport');
logger.info('Done');

logger.info('Connecting to MongoDB');
mongoose.connect(process.env.mongoURL || keys.mongoURL);
logger.info('Done');

logger.info('Starting Express');
const app = express();
logger.info('Done');

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [process.env.COOKIE_KEY || keys.cookieKey] // randomly chooses one of these keys to encrypt
    })
);

app.use(passport.initialize());
app.use(passport.session());

logger.info('Adding routes');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
logger.info('Done');

const PORT = process.env.PORT || 5000;

app.listen(PORT);
logger.info('Server running at: ' + PORT);
