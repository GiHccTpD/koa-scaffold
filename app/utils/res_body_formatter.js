'use strict';

const _ = require('lodash');

module.exports = body => {
    const newBody = _.pick(body, ['data', 'meta']);
    newBody.meta = _.pick(newBody.meta, ['code', 'msg', 'details']);
    const defaults = {
        meta: {
            code: 200,
            msg: 'ok',
            details: [],
        },
        data: {},
    };

    return _.merge(defaults, newBody);
};
