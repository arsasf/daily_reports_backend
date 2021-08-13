const express = require('express')
const Route = express.Router()
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const {
  getUserByNIK,
  updatePasswordUser,
  updateProfileUser,
  deleteProfileImage
} = require('./user_controller')

Route.get('/', authMiddleware.authentication, getUserByNIK)
Route.patch('/', authMiddleware.authentication, uploadFile, updateProfileUser)
Route.patch(
  '/delete-image',
  authMiddleware.authentication,
  uploadFile,
  deleteProfileImage
)
Route.patch(
  '/update-password',
  authMiddleware.authentication,
  updatePasswordUser
)
module.exports = Route
