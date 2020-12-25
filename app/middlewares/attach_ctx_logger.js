/* eslint-disable camelcase */
'use strict'

module.exports = (logger) =>
  async function attachCtxLogger(ctx, next) {
    const { request_cycle_trace_id } = ctx.state
    ctx.logger = logger.child({ request_cycle_trace_id })
    await next()
  }
