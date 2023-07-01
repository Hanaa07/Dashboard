const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log(req.headers);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        console.log(err)

        req.isAuthorised = !err
        next()
    })
}