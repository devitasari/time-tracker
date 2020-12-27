const { Member } = require('../models')
const axios = require('axios')

class MemberController {

    static create(req, res, next) {
        const UserId = req.loggedUser.id
        let rawData = req.body.data.split('\n')
        let data = rawData.map(e => {
            let el = e.split(',')
            return {
                name: el[0],
                apiKey: el[1],
                UserId
            }
        })
        Member.bulkCreate(data) // array
            .then(_ => {
                res.status(201).json({ msg: `create ${data.length} members succes` })
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
                res.status(200).json({ members })
            })
            .catch(next)
    }

    static summary(req, res, next) {
        const newData = []
        Member.findAll({
            where: {
                UserId: req.loggedUser.id
            }
        })
            .then(members => {
                const repo = req.body.repo || ""
                let promAll = members.map(member => {
                    newData.push({ name: member.name })
                    return axios.get(`https://wakatime.com/api/v1/users/current/all_time_since_today?api_key=${member.apiKey}&project=${repo}`)
                })
                return Promise.all(promAll)
            })
            .then(respon => {
                let total = 0
                respon.forEach((e,i) => {
                    newData[i].time = e.data.data.text
                    newData[i].seconds = e.data.data.total_seconds
                    total += e.data.data.total_seconds
                })
                let avg = total/newData.length 
                let underAvg = []
                newData.forEach(e => {
                    if (e.seconds < avg) {
                        underAvg.push(e)
                    }
                })
                res.status(200).json({ newData, avg, underAvg })
            })
            .catch(next)
    }
}

module.exports = MemberController