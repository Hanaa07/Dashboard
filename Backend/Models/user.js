const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    firstName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        lowercase: true, 
    },
    phoneNumber: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    JoinedIn: {
        type: mongoose.SchemaTypes.Date,
        required: true, 
        default: Date.now,
    },
    Dept: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
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