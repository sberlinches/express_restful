var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            field: 'username',
            allowNull: false
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
        countryId: {
            type: DataTypes.INTEGER,
            field: 'country_id'
        },
        stateId: {
            type: DataTypes.INTEGER,
            field: 'state_id'
        },
        cityId: {
            type: DataTypes.INTEGER,
            field: 'city_id'
        },
        languageId: {
            type: DataTypes.INTEGER,
            field: 'language_id'
        },
        birthAt: {
            type: DataTypes.DATE,
            field: 'birth_at'
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
            fullName: function(){
                return this.lastName ? this.firstName + ' ' + this.lastName : this.firstName;
            }
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