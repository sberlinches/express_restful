'use strict';

module.exports = {
    isProduction: process.env.NODE_ENV === 'production',
    node: {
        host: '127.0.0.1',
        port: 3443
    },
    redis: {
        client: '',
        host: '127.0.0.1',
        port: 6379,
        socket: '',
        url: ''
    },
    mysql: {
        host: '127.0.0.1',
        database: 'application',
        username: 'application_user',
        password: 'application_password'
    },
    sequelize: {
        mysql: {
            host: '127.0.0.1',
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
        }
    },
    bodyParser: {
        urlencoded: {
            extended: true
        }
    },
    session: {
        secret: '1234567890QWERTY',
        resave: true,
        saveUninitialized: true
    },
    keyPath: '../../../ssl/key.pem',
    certPath: '../../../ssl/cert.pem'
};