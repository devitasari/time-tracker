const express = require('express')
const route = express.Router()
const userRoutes = require('./user')
const memberRoutes = require('./member')

route.use('/users', userRoutes)
route.use('/members', memberRoutes)

module.exports = route