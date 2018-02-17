if ( process.env.PROFILE === 'dev' ) {
    module.exports = require('./dev');
} else {
    module.exports = require('./prod');
}