'use strict'

const {
  // REDIS_HOST,
  // REDIS_PASSWORD,
  // REDIS_PORT,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_DATABASE
} = process.env

module.exports = {
  logLevel: 'info',
  DATA_BASE: {
    database: MYSQL_DATABASE,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    options: {
      dialect: 'mysql',
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: false
    }
  }
}
