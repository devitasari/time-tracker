const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')

router.get('/', (req, res) => {
    res.send('Hai User!')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router