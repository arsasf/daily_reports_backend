const express = require('express')
const Route = express.Router()
const authRouter = require('../modules/auth/auth_routes')
const userRouter = require('../modules/user/user_routes')
const officialdomRouter = require('../modules/officialdom/officialdom_routes')

Route.use('/auth', authRouter)
Route.use('/user', userRouter)
Route.use('/officialdom', officialdomRouter)

module.exports = Route
