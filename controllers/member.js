const { Member } = require('../models')

class MemberController {

    static create(req, res, next) {
        req.body.UserId = req.loggedUser.id
        Member.create(req.body)
        .then(_=> {
            res.status(201).json({msg: `create ${req.body.name} succes`})
        })
        .catch(next)
    }

    static readAll(req, res, next) {
        Member.findAll({
            where: {
                UserId: req.loggedUser.id
            }
        })
        .then(members => {
            res.status(200).json({members})
        })
        .catch(next)
    }
}

module.exports = MemberController