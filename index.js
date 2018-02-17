const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger/logger');
const keys = require('./config/keys');

logger.info('Setting up Passport');
require('./services/passport');
logger.info('Done');

logger.info('Connecting to MongoDB');
mongoose.connect(process.env.mongoURL || keys.mongoURL);
logger.info('Done');

const app = express();

logger.info('Adding routes');
require('./routes/authRoutes')(app);
logger.info('Done');

const PORT = process.env.PORT || 5000;

app.listen(PORT);
logger.info('Server running at: ' + PORT);
