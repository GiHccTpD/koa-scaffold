'use strict';

const requireDirectory = require('require-directory');
const sequelize = require('../lib/mysql');
sequelize.sync();

module.exports = requireDirectory(module);
