var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(50),
            field: 'email',
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            field: 'password',
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(50),
            field: 'first_name',
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            field: 'last_name'
        },
        cityId: {
            type: DataTypes.INTEGER,
            field: 'city_id'
        },
        stateId: {
            type: DataTypes.INTEGER,
            field: 'state_id'
        },
        countryId: {
            type: DataTypes.INTEGER,
            field: 'country_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at'
        }
    }, {
        getterMethods: {
            fullName: function(){ return this.firstName + ' ' + this.lastName }
        },
        setterMethods: {
            fullName: function(value) {
                var names = value.split(' ');
                this.setDataValue('firstName', names.slice(0, -1).join(' '));
                this.setDataValue('lastName', names.slice(-1).join(' '));
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
        }
    });

    // Hooks
    User.beforeCreate(function(user, options, fn) {
        user.password = this.generateHash(user.password);
        return fn(null, options);
    });

    var City    = sequelize.import('City.js'),
        State   = sequelize.import('State.js'),
        Country = sequelize.import('Country.js');

    User.belongsTo(City, { foreignKey: 'cityId' });
    User.belongsTo(State, { foreignKey: 'stateId' });
    User.belongsTo(Country, { foreignKey: 'countryId' });

    return User;
};