const express = require('express')
const router = express.Router()
const MemberController = require('../controllers/member')

router.get('/', (req, res) => {
    res.send('Hai Member!')
})

module.exports = router