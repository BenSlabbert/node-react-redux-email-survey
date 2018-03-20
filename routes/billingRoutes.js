const logger = require('../logger/logger');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.STRIPE_SK);

module.exports = ( app ) => {
    app.post('/api/stripe', async ( req, res ) => {
        logger.info("Confirming charge with Stripe for id: " + req.body.id);

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'Email Survey $5 for 5 credits',
            source: req.body.id
        });

        console.log(charge);
    });
};
