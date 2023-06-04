const mongoose = require('mongoose');

const AbsenceSchema = new mongoose.Schema({
    firstName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    AbsenceInDays: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        //default: 0,
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
    },
    balance: {
        type: mongoose.SchemaTypes.Number,
    },
    SoldeId: {
        type: mongoose.Types.ObjectId,
        ref: 'solde',
    },
});
/*
const abs = mongoose.model('absence', AbsenceSchema);

const emp1 = new abs;


"AbsenceInDays" : 3,
"TypeOfAbs" : "congé",
"startedAt" : "2023-05-02",
"endedAt" : "2023-05-08",
"createdBy" : 2,
"UserId" : 4,
*/

module.exports = mongoose.model('absences', AbsenceSchema);