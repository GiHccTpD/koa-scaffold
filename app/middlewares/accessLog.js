/* eslint-disable camelcase */
'use strict';

module.exports = () => async (ctx, next) => {
    ctx.logger.debug({
        // stackdriver suggested to provide stack in the message
        message: `<-- ${ctx.method} ${ctx.path}`,
    });
    const start_at = Date.now();
    try {
        await next();

        // eslint-disable-next-line no-useless-catch
    } catch (e) {
        throw e;
    } finally {
        const latency = Date.now() - start_at;
        ctx.logger.info({
            // stackdriver suggested to provide stack in the message
            message: `--> ${latency}ms ${ctx.method} ${ctx.path} ${ctx.status} ${ctx.length}`,
            // https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#HttpRequest
            httpRequest: {
                status: ctx.status,
                userAgent: ctx.get('user-agent'),
                referer: ctx.get('referer'),
                requestMethod: ctx.method,
                responseSize: ctx.length,
                requestUrl: ctx.href,
                latency,
                remoteIp: ctx.ip,
            },
        });
    }
};
