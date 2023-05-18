'use strict';

function routerResponse() {
    return async function (ctx, next) {
        ctx.success = function (data) {
            ctx.res.statusCode = 200;
            ctx.body = {
                code: 0,
                msg: 'success',
                data: data || {},
            };
        };

        ctx.fail = function ({ code, msg, data }) {
            ctx.body = {
                code: code || 'server error',
                msg,
                data: data || {},
            };
        };

        await next();
    };
}

module.exports = routerResponse;
