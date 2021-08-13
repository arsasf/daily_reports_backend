const express = require('express')
const Route = express.Router()
const authMiddleware = require('../../middleware/auth')
const {
  updateOfficialdom,
  createOfficialdom,
  deleteOfficialdom,
  getAllOfficialdom,
  getDataById,
  getDataMembership,
  getDataDivision
} = require('./officialdom_controller')

Route.get('/', authMiddleware.authentication, getAllOfficialdom)
Route.get('/:id', authMiddleware.authentication, getDataById)
Route.get(
  '/member/all-members',
  authMiddleware.authentication,
  getDataMembership
)
Route.get('/member/division', authMiddleware.authentication, getDataDivision)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isManager,
  createOfficialdom
)
Route.patch('/:id', authMiddleware.authentication, updateOfficialdom)
Route.delete('/:id', authMiddleware.authentication, deleteOfficialdom)
module.exports = Route
