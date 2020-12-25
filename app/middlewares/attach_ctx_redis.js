'use strict'

module.exports = (redis) =>
  async function attachCtxLogger(ctx, next) {
    ctx.redis = redis
    await next()
  }
