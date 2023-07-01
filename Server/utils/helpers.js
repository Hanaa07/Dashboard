const bcrypt = require('bcryptjs');

function hashPwd(password){
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

function comparePwd(raw, hash){
    return bcrypt.compareSync(raw, hash)
}

module.exports = {
    hashPwd,
    comparePwd,
}