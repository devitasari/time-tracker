const express = require('express')
const router = express.Router()
const MemberController = require('../controllers/member')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Hai Member!')
})

router.use(authentication)
router.post('/', MemberController.create)
router.get('/', MemberController.readAll)

module.exports = router