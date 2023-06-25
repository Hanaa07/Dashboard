const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    adresse: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        lowercase: true,
        unique: true,
    },
    phone: {
        type: mongoose.SchemaTypes.String,
        required: true,

    },
    joinedIn: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    statut: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    exp_pro: {
        type: Date,
        required: true,
    },
    exp_mit: {
        type: Date,
        required: true,
    },
    birth: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
});


module.exports = mongoose.model('users', UserSchema);