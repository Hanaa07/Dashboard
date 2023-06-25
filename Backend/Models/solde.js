const mongoose = require("mongoose");

const SoldeSchema = new mongoose.Schema({
    balanceStartedAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
    balanceEndedAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now,
    },
    initialDays: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        //default: 0,
    },
    remainingDays: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        //default: 0,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
})

module.exports = mongoose.model('solde',SoldeSchema);