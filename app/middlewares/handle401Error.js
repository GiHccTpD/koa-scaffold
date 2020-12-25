'use strict'

module.exports = () =>
  async function handleUnauthorizedError(ctx, next) {
    try {
      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          meta: {
            code: 401,
            message: err.message || 'Unauthorized'
          },
          data: {}
        }
        return
      }
      throw err
    }
  }
