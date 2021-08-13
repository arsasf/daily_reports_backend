const connection = require('../../config/mysql')

module.exports = {
  getDataByNIK: (NIK) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_nik = ?',
        NIK,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateData: (setData, NIK) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_nik = ?',
        [setData, NIK],
        (error, result) => {
          if (!error) {
            const newResult = {
              NIK: NIK,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
