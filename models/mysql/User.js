var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(30),
            field: 'username',
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [2, 30]
            }
        },
        email: {
            type: DataTypes.STRING(254),
            field: 'email',
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [0, 254]
            }
        },
        password: {
            type: DataTypes.STRING(60),
            field: 'password',
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(30),
            field: 'first_name',
            allowNull: false,
            validate: {
                isAlpha: true,
                notEmpty: true,
                len: [0, 30]
            }
        },
        lastName: {
            type: DataTypes.STRING(30),
            field: 'last_name',
            validate: {
                isAlpha: true,
                notEmpty: true,
                len: [0, 30]
            }
        },
        countryId: {
            type: DataTypes.INTEGER,
            field: 'country_id',
            validate: {
                isInt: true
            }
        },
        stateId: {
            type: DataTypes.INTEGER,
            field: 'state_id',
            validate: {
                isInt: true
            }
        },
        cityId: {
            type: DataTypes.INTEGER,
            field: 'city_id',
            validate: {
                isInt: true
            }
        },
        languageId: {
            type: DataTypes.INTEGER,
            field: 'language_id',
            validate: {
                isInt: true
            }
        },
        birthAt: {
            type: DataTypes.DATE,
            field: 'birth_at',
            validate: {
                isDate: true
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            validate: {
                isDate: true
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            validate: {
                isDate: true
            }
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
            validate: {
                isDate: true
            }
        }
    }, {
        getterMethods: {},
        setterMethods: {
            username: function(value) {
                this.setDataValue('username', (value != null)? value.toLowerCase(): value);
            },
            email: function(value) {
                this.setDataValue('email', (value != null)? value.toLowerCase(): value);
            },
            firstName: function(value) {
                this.setDataValue('firstName', (value != null)? value.capitalize(): value);
            },
            lastName: function(value) {
                this.setDataValue('lastName', (value != null)? value.capitalize(): value);
            }
        },
        classMethods: {
            validPassword: function(password, hash, done, user) {
                bcrypt.compare(password, hash, function(error, isMatch){
                    if (error) console.log(error);
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            },
            generateHash: function(password) {
                return bcrypt.hashSync(password, 10);
            }
        },
        hooks: {
            beforeCreate: function(user, options, fn) {
                user.password = this.generateHash(user.password);
                return fn(null, options);
            }
        }
    });

    var City    = sequelize.import('City.js'),
        State   = sequelize.import('State.js'),
        Country = sequelize.import('Country.js');

    User.belongsTo(City, { foreignKey: 'cityId' });
    User.belongsTo(State, { foreignKey: 'stateId' });
    User.belongsTo(Country, { foreignKey: 'countryId' });

    return User;
};