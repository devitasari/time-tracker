const { verifyToken } = require('./jwt')
const { User } = require('../models')


function authentication(req, res, next) {

    try {
        let decodedToken = verifyToken(req.headers.token)
        console.log(decodedToken, '>>>>');
        User.findByPk(decodedToken.id)
        .then(user => {
            if (!user) next({ status: 401, message: 'Authentication Failed' })
            else {
                req.loggedUser = decodedToken
                next()
            }
        })
        .catch(next)
    } catch (error) {
        next({ status: 401, message: error })
    }

}

function authorization() {

}

module.exports = { authentication, authorization }