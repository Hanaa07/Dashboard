const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
    },
    enabled: {
      type: Boolean,
      default: false,
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

userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw  Error("incorrect email");
}


module.exports = mongoose.model('users', userSchema);