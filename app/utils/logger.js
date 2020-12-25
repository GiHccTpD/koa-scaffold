'use strict'

const _ = require('lodash')
const config = require('config')
const winston = require('winston')
const moment = require('moment')

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
const levels = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
}

const colors = {
  emergency: 'red',
  alert: 'red',
  critical: 'red',
  error: 'red',
  warning: 'yellow',
  notice: 'blue',
  info: 'cyan',
  debug: 'magenta'
}

let format

// the `info` is actually an instance, so can't use `Object.assign`....
// must reassign the function params if need to use winstonjs
/* eslint no-param-reassign: 0 */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  winston.addColors(colors)
  format = winston.format.combine(
    winston.format.colorize(),
    winston.format((info) => {
      info.severity = info.level.toUpperCase()
      delete info.level
      return info
    })(),
    winston.format.printf((info) => {
      const finalInfo = _.omit(info, 'message', 'severity')
      const json = JSON.stringify(finalInfo)
      let result = `${moment().format(
        'YYYY-MM-DD HH:mm:ss.SSS'
      )} [${info.severity.toLowerCase()}]: ${info.message}`
      if (Object.keys(finalInfo).length !== 0) {
        result += ` ${json}`
      }
      return result
    })
  )
} else {
  format = winston.format.combine(
    winston.format((info) => {
      info.severity = info.level.toUpperCase()
      delete info.level
      return info
    })(),
    winston.format.json({
      replacer: (key, value) => {
        if (key === 'password') return '***'
        return Buffer.isBuffer(value) ? value.toString('base64') : value
      }
    })
  )
}

const transports = [new winston.transports.Console()]

if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({ filename: `log/${moment().format('YYYY-MM-DD')}.log` })
  )
}

const logger = winston.createLogger({
  levels,
  level: config.logLevel,
  format,
  transports
})

logger.debug('[LOG_LEVEL]: ' + config.logLevel)

module.exports = logger
