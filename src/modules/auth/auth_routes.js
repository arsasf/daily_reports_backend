const express = require('express')
const Route = express.Router()
const { register, login } = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)
module.exports = Route
