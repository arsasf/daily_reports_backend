const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          console.log('\nAunthentication is success')
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please login first!')
    }
  },
  isManager: (req, res, next) => {
    if (req.decodeToken.user_role === 'manager') {
      console.log(
        `=====> Welcome manager ${req.decodeToken.user_name} ! <=====`
      )
      next()
    } else {
      return helper.response(res, 403, 'Sorry, you are not manager')
    }
  }
}
