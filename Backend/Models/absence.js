const mongoose = require('mongoose');

const AbsenceSchema = new mongoose.Schema({
    AbsId: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    AbsInDays: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        //default: 0,
    },
    TypeOfAbs: {
        type: mongoose.SchemaTypes.String,
        required: true,
        //default: "Maladie",
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
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
});
/*
const abs = mongoose.model('absence', AbsenceSchema);

const emp1 = new abs;

emp1.AbsId = 1;
emp1.AbsInDays = 3;
emp1.createdAt = '2023-05-02';
emp1.TypeOfAbs = 'congé';
emp1.startedAt = '2023-05-02';
emp1.endedAt = '2023-05-08';
emp1.createdBy = 2;
emp1.UserId = 4;
*/

module.exports = mongoose.model('absences', AbsenceSchema);