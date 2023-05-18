'use strict';

/**
 * General error handler for catching all the errors inside middlewares or controllers
 *
 * In development mode the error stack could be printed
 * In production, error stack is hidden
 * This middleware is going to catch all of the unhanded errors
 */
module.exports = () =>
    async function handle500Error(ctx, next) {
        try {
            await next();
        } catch (err) {
            // if it's not a specified http error with status
            // set status to 500 because it's unexpected
            ctx.status = 500;
            let detailErrorMessage = err.message;
            let { stack } = err;
            let details = [
                {
                    path: 'data',
                    info: err.message,
                },
                {
                    path: 'stack',
                    info: stack,
                },
            ];

            // mask error & stack for server error out of development
            if (!['test', 'development'].includes(ctx.config.env)) {
                detailErrorMessage = 'Internal Error';
                stack = null;
                details = [];
            }

            ctx.body = {
                meta: {
                    code: 500,
                    message: detailErrorMessage,
                    details,
                },
                data: {},
            };
        }
    };
