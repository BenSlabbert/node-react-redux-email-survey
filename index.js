const express = require('express');

console.log('Setting up Passport');
require('./services/passport');
console.log('Done');

const app = express();

console.log('Adding routes');
require('./routes/authRoutes')(app);
console.log('Done');

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log('Server running at: ' + PORT);
