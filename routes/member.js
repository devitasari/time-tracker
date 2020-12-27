const express = require('express')
const router = express.Router()
const MemberController = require('../controllers/member')
const { authentication, authorization } = require('../middlewares/auth')


router.use(authentication)
router.post('/', MemberController.create)
router.get('/', MemberController.readAll)
router.get('/summary', MemberController.summary)

module.exports = router