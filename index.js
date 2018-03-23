const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger/logger');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// declare the model before mongoose needs it
require('./models/User');
require('./models/Surveys');
require('./models/Charges');

logger.info('Setting up Passport');
require('./services/passport');
logger.info('Done');

logger.info('Connecting to MongoDB');
mongoose.connect(process.env.MONGO_URL || keys.MONGO_URL);
logger.info('Done');

logger.info('Starting Express');
const app = express();
logger.info('Done');

logger.info('Adding middleware');
app.use(
    cookieSession({
        // 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // randomly chooses one of these keys to encrypt
        keys: [process.env.COOKIE_KEY || keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
logger.info('Done');

logger.info('Adding routes');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
logger.info('Done');

if (process.env.NODE_ENV === 'production') {
    // serve react app
    app.use(express.static('client/build'));

    // send the index.html file if the request path is unknown
    // serves as a 'catch all' for routes
    const path = require('path');
    app.get('*', ( req, res ) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
logger.info('Server running at: ' + PORT);
