const User = require("../Models/user");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    console.log(err);
    if (err.message === "incorrect email") {
        errors.email = "Cet email n'est pas valide";
    }

    if (err.message === "incorrect password") {
        errors.password = "Ce mot de passe est incorrect";
    }

    if (err.code === 11000) {
        errors.email = "Cet email est déjà utilisé";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        console.log(user)

        if (!user.enabled){
            const errors = {email:"Votre compte n'est pas activé."}
            return res.send({ errors, user: null, status: false });
        }
        const token = createToken(user._id);
        return res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 }).send({ user: user, status: true });
    } catch (err) {
        const errors = handleErrors(err);
        return res.send({ errors, user: null, status: false });
    }
};