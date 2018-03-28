module.exports = {
    info: function ( message ) {
        if (process.env.NODE_ENV === 'production') {
            console.log(message);
        } else {
            console.log('\x1b[32m%s\x1b[0m', new Date() + ' [info] \t: ' + message);
        }
    },
    warn: function ( message ) {
        if (process.env.NODE_ENV === 'production') {
            console.log(message);
        } else {
            console.log('\x1b[35m%s\x1b[0m', new Date() + ' [warn] \t: ' + message);
        }
    },
    error: function ( message ) {
        if (process.env.NODE_ENV === 'production') {
            console.log(message);
        } else {
            console.log('\x1b[31m%s\x1b[0m', new Date() + ' [error] \t: ' + message);
        }
    }
};
