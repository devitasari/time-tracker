const bcrypt = require('bcryptjs')

function generateHash(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function compareHash(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { generateHash, compareHash }