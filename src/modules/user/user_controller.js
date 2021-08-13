const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const userModel = require('./user_model')
const fs = require('fs')

module.exports = {
  getUserByNIK: async (req, res) => {
    try {
      const NIK = req.decodeToken.user_nik
      const result = await userModel.getDataByNIK(NIK)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success get data by NIK !', result)
      } else {
        return helper.response(res, 404, 'Failed, NIK not found !', [])
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  updateProfileUser: async (req, res) => {
    try {
      const NIK = req.decodeToken.user_nik
      const resultNIK = await userModel.getDataByNIK(NIK)
      const { userFullname, userEmail, userPhoneNumber } = req.body
      if (resultNIK.length > 0) {
        if (req.file !== undefined) {
          const setData = {
            user_image: req.file ? req.file.filename : resultNIK[0].user_image,
            user_fullname: userFullname || resultNIK[0].user_fullname,
            user_email: userEmail || resultNIK[0].user_email,
            user_phone_number:
              userPhoneNumber || resultNIK[0].user_phone_number,
            user_updated_at: new Date(Date.now())
          }
          const imageToDelete = resultNIK[0].user_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)
          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
              console.log(err)
            })
          }
          const result = await userModel.updateData(setData, NIK)
          return helper.response(res, 200, 'Success update Profile', result)
        } else {
          const setData = {
            user_image: resultNIK[0].user_image,
            user_fullname: userFullname || resultNIK[0].user_fullname,
            user_email: userEmail || resultNIK[0].user_email,
            user_phone_number:
              userPhoneNumber || resultNIK[0].user_phone_number,
            user_updated_at: new Date(Date.now())
          }
          const result = await userModel.updateData(setData, NIK)
          return helper.response(res, 200, 'Success update Profile', result)
        }
      } else {
        return helper.response(res, 404, 'Failed, NIK not found !', [])
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  deleteProfileImage: async (req, res) => {
    try {
      const NIK = req.decodeToken.user_nik
      const resultNIK = await userModel.getDataByNIK(NIK)
      if (resultNIK.length > 0) {
        const setData = {
          user_image: '',
          user_fullname: resultNIK[0].user_fullname,
          user_email: resultNIK[0].user_email,
          user_phone_number: resultNIK[0].user_phone_number,
          user_updated_at: new Date(Date.now())
        }
        const imageToDelete = resultNIK[0].user_image
        const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)
        if (isImageExist && imageToDelete) {
          fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
            if (err) throw err
            console.log(err)
          })
        }
        const result = await userModel.updateData(setData, NIK)
        return helper.response(res, 200, 'Success Delete Image', result)
      } else {
        return helper.response(res, 404, 'Failed, NIK not found !', [])
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  updatePasswordUser: async (req, res) => {
    try {
      const NIK = req.decodeToken.user_nik
      const { userNewPassword, userConfirmPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userNewPassword, salt)
      const resultNIK = await userModel.getDataByNIK(NIK)
      const checkPassword = bcrypt.compareSync(
        userNewPassword,
        resultNIK[0].user_password
      )

      if (userNewPassword === '') {
        return helper.response(res, 400, 'Please input field!')
      }
      if (userConfirmPassword === '') {
        return helper.response(res, 400, 'Please input field!')
      }
      if (resultNIK.length > 0) {
        if (checkPassword) {
          return helper.response(
            res,
            400,
            'New Password same with Old Password, please input different!'
          )
        } else if (userNewPassword !== userConfirmPassword) {
          return helper.response(
            res,
            400,
            'New Password and Confirm Password are different, please check again!'
          )
        } else {
          const setData = {
            user_password: encryptPassword,
            user_updated_at: new Date(Date.now())
          }
          const result = await userModel.updateData(setData, NIK)
          delete result.user_password
          console.log('Sucess Update New Password !')
          return helper.response(
            res,
            200,
            'Success Update New Password',
            result
          )
        }
      } else {
        return helper.response(res, 404, 'Failed, user not found !', [])
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  }
}
