var Sequelize = require('sequelize');
var sequelize = new Sequelize('application', 'application_user', 'application_password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        // Add the timestamp attributes (updatedAt, createdAt, deletedAt)
        timestamps: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        freezeTableName: true
    },
    timezone: 'America/Vancouver'
});

module.exports = sequelize;