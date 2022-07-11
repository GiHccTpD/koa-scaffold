'use strict'

const Koa = require('koa')
const config = require('config')
const bodyParser = require('koa-bodyparser')
const responseTime = require('koa-response-time')
const jwt = require('koa-jwt')
const cors = require('@koa/cors')

const app = new Koa()

const logger = require('./app/utils/logger')
const resBodyFormatter = require('./app/utils/res_body_formatter')
const attachCtxLogger = require('./app/middlewares/attach_ctx_logger')
const attachCtxRedis = require('./app/middlewares/attach_ctx_redis')
const attachCtxModel = require('./app/middlewares/attach_ctx_mysql')
const attachCtxBodyFormatter = require('./app/middlewares/attach_ctx_body_formatter')
const accessLog = require('./app/middlewares/accessLog')
const handle401Error = require('./app/middlewares/handle401Error')
const handle404Error = require('./app/middlewares/handle404Error')
const handle4xxError = require('./app/middlewares/handle4xxError')
const handle500Error = require('./app/middlewares/handle500Error')
const redis = require('./app/lib/redis')
const model = require('./app/models/index')
const logError = require('./app/listeners/logError')
const routers = require('./app/routers')
const port = 3000
const TOKEN_KEY = ''

logger.info(`[env: ${process.env.NODE_ENV}] retail-pm service run on ${port}`)
app.context.config = config
app
  .use(
    cors({
      origin: '*',
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] // 设置所允许的HTTP请求方法
      // allowHeaders: ['Content-Type', 'Authorization', 'Accept'] // 设置服务器支持的所有头信息字段
    })
  )
  .on('error', logError())
  .use(attachCtxLogger(logger))
  .use(responseTime())
  .use(accessLog())
  // error handlers
  .use(handle500Error())
  // client side error handlers
  .use(handle4xxError())
  .use(handle401Error())
  .use(attachCtxModel(model))
  .use(jwt({ secret: TOKEN_KEY }).unless({ path: [/^\/login/, /^\/register/, /^\/uploadIcon/] })) // usless排除进行jwt校验的路由
  .use(attachCtxRedis(redis))
  // the application only supports json payload
  .use(
    bodyParser({
      enabledTypes: ['json'],
      onerror: (_, ctx) => {
        ctx.throw(400, 'Invalid JSON data')
      }
    })
  )
  .use(attachCtxBodyFormatter(resBodyFormatter))
  .use(routers.routes(), routers.allowedMethods())
  // 404 in koa should be in the last
  .use(handle404Error())

app.listen(port)
