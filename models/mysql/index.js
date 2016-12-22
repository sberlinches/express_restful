"use strict";

const config    = require('../../config'),
    Sequelize   = require('sequelize'),
    sequelize   = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.sequelize.mysql);

module.exports = sequelize;