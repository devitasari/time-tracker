const { User } = require('../models')
const { compareHash } = require('../middlewares/bcrypt')
const { generateToken } = require('../middlewares/jwt')

class UserController {

    static register(req, res, next) {
        User.create(req.body)
        .then(_=> {
            res.status(201).json({ msg: `register ${req.body.username} succes!`})
        })
        .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) throw {message: 'Email/Password is wrong'}
            const isPass = compareHash(req.body.password, user.password)
            if (!isPass) throw {message: 'Email/Password is wrong'}
            let payload = {
                id: user._id,
                username: user.username
            }
            let token = generateToken(payload)
            res.status(200).json({msg: 'Success Login', token})
        })
        .catch(next)
    }
}

module.exports = UserController