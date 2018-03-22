const mongoose = require('mongoose');
const { Schema } = mongoose;

const chargeSchema = new Schema({
    userId: String,
    charge: Object,
    createdAt: Number
});

mongoose.model('charges', chargeSchema);
