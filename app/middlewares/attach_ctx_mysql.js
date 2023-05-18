'use strict';

module.exports = model =>
    async function attachCtxLogger(ctx, next) {
        ctx.model = model;
        await next();
    };
