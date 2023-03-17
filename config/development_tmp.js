'use strict'

module.exports = {
  logLevel: 'info',
  DATA_BASE: {
    database: '',
    username: '',
    password: '',
    options: {
      dialect: 'mysql',
      host: '',
      port: '',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: false
    }
  }
}
