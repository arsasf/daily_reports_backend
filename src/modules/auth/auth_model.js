const connection = require('../../config/mysql')

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET?', data, (error, result) => {
        console.log(error)
        if (!error) {
          const newResult = {
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getDataConditions: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE ?', data, (error, result) => {
        console.log(error)
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getDataUser: (userEmail) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user.user_email FROM user where user_email = ?',
        userEmail,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataUserNik: (userEmail) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT user.user_nik FROM user where user_nik = ?',
        userEmail,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
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
