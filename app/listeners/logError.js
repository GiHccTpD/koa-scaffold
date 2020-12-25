'use strict'

const _ = require('lodash')
const logger = require('../utils/logger')

module.exports = () =>
  function logError(err, ctx) {
    // https://cloud.google.com/error-reporting/docs/formatting-error-messages
    const errObj = {
      // stackdriver suggested to provide stack in the message
      message: err.stack || err.message || err.details,
      // https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#HttpRequest
      httpRequest: {
        status: 500,
        userAgent: ctx.get('user-agent'),
        referer: ctx.get('referer'),
        requestMethod: ctx.method,
        responseSize: ctx.length,
        requestUrl: ctx.href,
        latency: ctx.state.response_time,
        remoteIp: ctx.ip
      }
    }

    if (err.config) {
      errObj.requestError = {
        method: err.config.method,
        message: err.config.message,
        headers: Object.assign(
          {},
          err.config.headers.common,
          err.config.headers[err.config.method],
          _.omit(err.config.headers, ['common', 'delete', 'post', 'put', 'patch', 'get', 'head'])
        ),
        url: err.config.url,
        auth: err.config.auth,
        data: err.config.data,
        requestId: err.config.requestId
      }
    }

    logger.error(errObj)
  }
