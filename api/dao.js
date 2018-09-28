const sqlite3 = require('sqlite3').verbose()

class AppDAO {

  constructor(dbFilePath) {
      this.db = new sqlite3.Database(dbFilePath, (err) => {
        if (err) {
          console.log('Could not connect to database', err)
        } else {
          console.log('Connected to database')
        }
      })
    }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err, data) => {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

module.exports = AppDAO
