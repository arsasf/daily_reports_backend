const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const officialdomModel = require('../officialdom/officialdom_model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  register: async (req, res) => {
    try {
      const { userNik, userPassword, userEmail, userRole } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      const checkEmail = await authModel.getDataUser(userEmail)
      const checkNikUser = await authModel.getDataUserNik(userNik)

      if (userNik.length < 16) {
        return helper.response(res, 400, 'Please input NIK 16 character !')
      }
      if (userPassword.length <= 0) {
        return helper.response(res, 400, 'Please input your password !')
      }
      if (userEmail.length <= 0) {
        return helper.response(res, 400, 'Please input your email !')
      }
      if (userRole.length <= 0) {
        return helper.response(res, 400, 'Please choose your role !')
      }
      if (checkEmail > 0) {
        return helper.response(
          res,
          409,
          'Your Email was resgistered, duplicated data !'
        )
      }
      const userFullname = Math.floor(Math.random() * 408792765337)
      if (checkNikUser.length === 0) {
        if (userRole === 'manager') {
          const setData = {
            user_nik: userNik,
            user_fullname: `user${userFullname}`,
            user_email: userEmail,
            user_password: encryptPassword,
            user_role: userRole,
            user_membership: 'verified'
          }
          const createOfficialdom = {
            officialdom_nik: userNik,
            officialdom_division: 'manager',
            officialdom_status: 'active'
          }
          const result = await authModel.register(setData)
          await officialdomModel.createData(createOfficialdom)
          delete result.user_password
          return helper.response(
            res,
            200,
            'Success Register, Thanks for join !',
            result
          )
        } else {
          const setData = {
            user_nik: userNik,
            user_fullname: `user${userFullname}`,
            user_email: userEmail,
            user_password: encryptPassword,
            user_role: userRole,
            user_membership: 'unknown'
          }
          const result = await authModel.register(setData)
          delete result.user_password
          return helper.response(
            res,
            200,
            'Success Register, Thanks for join !',
            result
          )
        }
      } else {
        return helper.response(
          res,
          409,
          'Your NIK was resgistered, duplicated data !'
        )
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  login: async (req, res) => {
    try {
      const { userNik, userPassword } = req.body
      const checkNikUser = await authModel.getDataConditions({
        user_nik: userNik
      })
      if (userNik.length < 16) {
        return helper.response(res, 400, 'Please input NIK 16 character !')
      }
      if (userPassword.length <= 0) {
        return helper.response(res, 400, 'Please input your password !')
      }
      if (checkNikUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkNikUser[0].user_password
        )
        if (checkPassword) {
          const payload = checkNikUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success login !', result)
        } else {
          return helper.response(res, 400, 'Wrong Password !')
        }
      } else {
        return helper.response(res, 404, 'NIK/ Account Not registered')
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  }
}
