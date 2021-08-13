const helper = require('../../helpers/wrapper')
const officialdomModel = require('./officialdom_model')
const userModel = require('../../modules/user/user_model')

module.exports = {
  getAllOfficialdom: async (req, res) => {
    try {
      let {
        status,
        day,
        week,
        month,
        year,
        page,
        limit,
        dateStart,
        dateEnd,
        sort,
        keyword
      } = req.query
      status = status || 'active'
      day = day || ''
      week = week || 'week(officialdom_created_at)'
      month = month || 'month(officialdom_created_at)'
      year = year || 'year(officialdom_created_at)'
      page = page || 1
      limit = limit || 10
      dateStart = dateStart || '2015-01-01'
      dateEnd = dateEnd || '2025-12-31'
      sort = sort || 'ASC'
      keyword = keyword || ''
      const resultCount = await officialdomModel.getDataCount(
        status,
        day,
        week,
        month,
        year,
        dateStart,
        dateEnd,
        keyword
      )
      const offset = page * limit - limit
      const totalData = resultCount[0].total
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await officialdomModel.getAllOfficialdom(
        limit,
        offset,
        status,
        day,
        week,
        month,
        year,
        dateStart,
        dateEnd,
        sort,
        keyword
      )
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success get all data employees',
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 404, 'Data Not Found !', [])
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  getDataById: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await officialdomModel.getDataById(id)
      if (resultId.length > 0) {
        return helper.response(res, 200, 'Success get data employee', resultId)
      } else {
        return helper.response(
          res,
          404,
          'Failed, employee not join membership !',
          []
        )
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  getDataMembership: async (req, res) => {
    try {
      const result = await officialdomModel.getDataMembership()
      if (result.length > 0) {
        return helper.response(res, 200, 'Success get Data employees', result)
      } else {
        return helper.response(res, 404, 'Failed, employees not found !', [])
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  getDataDivision: async (req, res) => {
    try {
      const unknown = await officialdomModel.getDataCountUnknown()
      const developer = await officialdomModel.getDataCountDivision('developer')
      const finance = await officialdomModel.getDataCountDivision('finance')
      const manager = await officialdomModel.getDataCountDivision('manager')
      const result = {
        unknown: unknown[0].total,
        developer: developer[0].total,
        finance: finance[0].total,
        manager: manager[0].total
      }
      return helper.response(res, 200, 'Success Delete employees', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  createOfficialdom: async (req, res) => {
    try {
      const { officialdomNIK, officialdomDivision, officialdomStatus } =
        req.body
      if (officialdomNIK === '') {
        return helper.response(res, 400, 'Please choose employee!')
      }
      if (officialdomDivision === '') {
        return helper.response(res, 400, 'Please choose division!')
      }
      if (officialdomStatus === '') {
        return helper.response(res, 400, 'Please choose status!')
      }
      const checkNIK = await officialdomModel.getDataCondition(officialdomNIK)
      if (checkNIK.length > 0) {
        return helper.response(
          res,
          409,
          'Duplicated NIK, please choose other !'
        )
      }
      const setData = {
        officialdom_nik: officialdomNIK,
        officialdom_division: officialdomDivision,
        officialdom_status: officialdomStatus
      }
      const updateMembership = {
        user_membership: 'verified',
        user_updated_at: new Date(Date.now())
      }
      await userModel.updateData(updateMembership, officialdomNIK)
      const result = await officialdomModel.createData(setData)
      return helper.response(res, 200, 'Success create employees', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  updateOfficialdom: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await officialdomModel.getDataById(id)
      const { officialdomNIK, officialdomDivision, officialdomStatus } =
        req.body
      if (resultId.length > 0) {
        const setData = {
          officialdom_nik: officialdomNIK || resultId[0].officialdomNIK,
          officialdom_division:
            officialdomDivision || resultId[0].officialdom_division,
          officialdom_status:
            officialdomStatus || resultId[0].officialdom_status,
          officialdom_updated_at: new Date(Date.now())
        }
        const result = await officialdomModel.updateData(setData, id)
        return helper.response(res, 200, 'Success update employees', result)
      } else {
        return helper.response(res, 404, 'Failed, employees not found !', [])
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  deleteOfficialdom: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await officialdomModel.getDataById(id)
      if (resultId.length > 0) {
        const updateMembership = {
          user_membership: 'unknown',
          user_updated_at: new Date(Date.now())
        }
        await userModel.updateData(updateMembership, resultId[0].user_nik)
        const result = await officialdomModel.deleteData(id)
        return helper.response(res, 200, 'Success Delete employees', result)
      } else {
        return helper.response(
          res,
          404,
          'Failed, employees not join membership !',
          []
        )
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  }
}
