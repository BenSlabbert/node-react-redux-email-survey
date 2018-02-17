const express = require('express');
const logger = require('./logger/logger');

logger.info('Setting up Passport');
require('./services/passport');
logger.info('Done');

const app = express();

logger.info('Adding routes');
require('./routes/authRoutes')(app);
logger.info('Done');

const PORT = process.env.PORT || 5000;

app.listen(PORT);
logger.info('Server running at: ' + PORT);
