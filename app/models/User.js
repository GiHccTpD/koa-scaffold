'use strict'

const sequelize = require('../lib/mysql')
const Sequelize = require('sequelize')

module.exports = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: false
    },
    group: {
      type: Sequelize.STRING
    },
    domain: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)
