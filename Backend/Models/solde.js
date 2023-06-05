const mongoose = require("mongoose");

const SoldeSchema = new mongoose.Schema({
    firstName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    startedAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        //default: Date.now,
    },
    endedAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now,
    },
    RemainingDays: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        //default: 0,
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
    },
})

module.exports = mongoose.model('solde',SoldeSchema);