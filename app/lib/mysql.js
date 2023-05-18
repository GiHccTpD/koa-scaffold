'use strict';

const Sequelize = require('sequelize');
const { DATA_BASE } = require('config');
const logger = require('../utils/logger');
const { database, username, password, options } = DATA_BASE;
const sequelize = new Sequelize(database, username, password, options);

sequelize
    .authenticate()
    .then(() => {
        logger.info('Connection has been established successfully.');
    })
    .catch(err => {
        logger.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
