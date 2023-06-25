const mongoose = require('mongoose');

const AbsenceSchema = new mongoose.Schema({
    days: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        //default: 0,
    },
    absenceStartedAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
    absenceEndedAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now,
    },
    solde: {
        type: mongoose.Types.ObjectId,
        ref: 'solde',
        required: true
    },
});


module.exports = mongoose.model('absences', AbsenceSchema);