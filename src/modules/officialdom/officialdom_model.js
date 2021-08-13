const connection = require('../../config/mysql')

module.exports = {
  getDataCount: (
    status,
    day,
    week,
    month,
    year,
    dateStart,
    dateEnd,
    keyword
  ) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT count(*) AS total FROM officialdom JOIN user ON user.user_nik = officialdom.officialdom_nik WHERE officialdom_status LIKE '%${status}%' AND user.user_fullname LIKE '%${keyword}%' AND officialdom_created_at LIKE '%${day}%' AND officialdom_created_at BETWEEN '${dateStart}' AND '${dateEnd}' AND week(officialdom_created_at) = ${week} AND month(officialdom_created_at) = ${month} AND year(officialdom_created_at) = ${year}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getAllOfficialdom: (
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
  ) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM officialdom JOIN user ON user.user_nik = officialdom.officialdom_nik WHERE officialdom_status LIKE '%${status}%' AND user.user_fullname LIKE '%${keyword}%' AND officialdom_created_at LIKE '%${day}%' AND officialdom_created_at BETWEEN '${dateStart}' AND '${dateEnd}' AND week(officialdom_created_at) = ${week} AND month(officialdom_created_at) = ${month} AND year(officialdom_created_at) = ${year} ORDER BY user.user_fullname ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user JOIN officialdom ON officialdom.officialdom_nik = user.user_nik WHERE officialdom.officialdom_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataMembership: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_membership = 'unknown'",
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCondition: (NIK) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM officialdom WHERE officialdom_nik = ${NIK}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCountDivision: (division) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM officialdom WHERE officialdom_division = '${division}' AND year(officialdom_created_at) = year(now())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCountUnknown: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM user WHERE user_membership = "unknown" AND year(user_created_at) = year(now())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO officialdom SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE officialdom SET ? WHERE officialdom_id = ${id}`,
        setData,
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
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM officialdom WHERE officialdom_id = ?',
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id
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
