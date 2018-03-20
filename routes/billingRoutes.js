const logger = require('../logger/logger');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.STRIPE_SK);
const requireLogin = require('../middlewares/requireLogin');

module.exports = ( app ) => {
    app.post(
        '/api/stripe', // path
        requireLogin, // middleware for this request
        async ( req, res ) => { // function to process request
            logger.info("Confirming charge with Stripe for id: " + req.body.id);

            // TODO: save this charges object to the db
            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: 'Email Survey $5 for 5 credits',
                source: req.body.id
            });

            req.user.credits += 5;
            const user = await req.user.save();

            res.send(user);
        });
};
