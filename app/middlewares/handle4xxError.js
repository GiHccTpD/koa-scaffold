'use strict'

const logger = require('../utils/logger')

module.exports = () =>
  async function handle4xxError(ctx, next) {
    try {
      await next()
    } catch (err) {
      if (err.status && err.status < 500 && err.status >= 400) {
        ctx.status = err.message === 'Schema validation error' ? 422 : err.status
        ctx.body = {
          meta: {
            code: err.metaCode || err.code || ctx.status || err.status,
            message: err.message,
            details: err.details
          },
          data: {}
        }

        logger.warning({
          message: '4XX error occured',
          requestIp: ctx.ip,
          requestMethod: ctx.method,
          // eslint-disable-next-line no-underscore-dangle
          requestPath: ctx._matchedRoute,
          httpStatus: ctx.status,
          errorMessage: err.message
        })
        return
      }
      throw err
    }
  }
