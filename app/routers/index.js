'use strict'

const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const files = fs.readdirSync(__dirname)

files
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const fileName = file.substr(0, file.length - 3)
    const fileEntity = require(path.join(__dirname, file))
    if (fileName !== 'index') {
      router.use(fileEntity.routes(), fileEntity.allowedMethods())
    }
  })

module.exports = router
