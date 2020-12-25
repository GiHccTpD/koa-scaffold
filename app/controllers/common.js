'use strict'

// const redisKey = require('../lib/redis_key')

exports.healthz = async function (ctx) {
  try {
    const meta = {
      code: 200
    }
    ctx.body = ctx.f({ meta })
  } catch (error) {
    ctx.logger.error({ message: 'Error occur in healthz', error })
    ctx.throw(503)
  }
}

exports.root = (ctx) => {
  ctx.status = 200
  ctx.body = 'hello koa'
}

exports.error = async (ctx) => {
  await new Promise((resolve, reject) => {
    reject(new Error('error test'))
  })
}
