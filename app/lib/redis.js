'use strict'

const Redis = require('ioredis')
const config = require('config')
const logger = require('../utils/logger')

const redisConfig = config.redis
const redis = new Redis(redisConfig)

redis.on('connect', () => {
  logger.info('redis connect successfully.')
})

redis.on('error', (err) => {
  logger.error('redis connect failed: ', err)
})

module.exports = redis
