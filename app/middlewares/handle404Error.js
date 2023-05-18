'use strict';

module.exports = () =>
    async function handleNotFoundError(ctx) {
        ctx.status = 404;

        ctx.body = {
            meta: {
                code: 404,
                message: `404 - Path ${ctx.path} is not found on our server`,
            },
            data: {},
        };
    };
