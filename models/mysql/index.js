var Sequelize = require('sequelize'),
    sequelize = new Sequelize('application', 'application_user', 'application_password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: true, // Add timestamp attributes (updatedAt, createdAt, deletedAt)
        paranoid: true, // Don't delete database entries but set the attribute (deletedAt)
        underscored: true // Automatically underscore timestamps fields (updated_at, created_at, deleted_at)
    }
});

module.exports = sequelize;