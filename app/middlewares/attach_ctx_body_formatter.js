/* eslint-disable camelcase */
'use strict'

module.exports = (f) =>
  async function attachCtxLogger(ctx, next) {
    ctx.f = f
    await next()
  }
