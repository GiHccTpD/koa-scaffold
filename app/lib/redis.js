'use strict';

const Redis = require( 'ioredis' );
const config = require( 'config' );
const logger = require( './logger' );

const redisConfig = config.redis;

let redis;

// 判断是否为 cluster 模式：host 中含有逗号
if ( typeof redisConfig.host === 'string' && redisConfig.host.includes( ',' ) ) {
    // Cluster 模式
    const hosts = redisConfig.host.split( ',' ).map( h => h.trim() );

    const clusterNodes = hosts.map( host => ( {
        host: host,
        port: redisConfig.port || 6379,
    } ) );

    redis = new Redis.Cluster( clusterNodes, {
        redisOptions: {
            password: redisConfig.password,
            db: redisConfig.db || 0,
        },
    } );

    logger.info( '🚀 Redis running in **Cluster Mode**' );
} else {
    // 单节点模式
    redis = new Redis( {
        port: redisConfig.port,
        host: redisConfig.host,
        password: redisConfig.password,
        db: redisConfig.db || 0,
    } );

    logger.info( '🔗 Redis running in **Single Node Mode**' );
}

redis.on( 'connect', () => {
    logger.info( '⛺️Redis connect successfully.' );
} );

redis.on( 'error', err => {
    logger.error( '❌Redis connect failed: ', err );
} );

module.exports = redis;
