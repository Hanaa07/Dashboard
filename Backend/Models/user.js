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
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        lowercase: true,
        unique: true,
    },
    phoneNumber: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    JoinedIn: {
        type: mongoose.SchemaTypes.Date,
        required: true, 
        default: Date.now,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: new Date(),
    },
    statut: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    balance: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    }
});
/*
const User = mongoose.model('user', UserSchema);

const admin = new User;

admin.user_id = 1;
admin.fn = "salim";
admin.ln = "el bouanani";
admin.username = "MIT";
admin.pwd = "MIT123";
admin.email = "mit@gmail.com";
admin.phoneNumber = 0612345145;
admin.createdAt = '2023-02-03';
admin.JoinedIn;
admin.Dept = "Dev";
*/


module.exports = mongoose.model('users', UserSchema);