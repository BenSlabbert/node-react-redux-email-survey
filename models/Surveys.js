const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipients');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    // sub document collection
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    // user relationship
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);
