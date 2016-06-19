module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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
        firstName: {
            type: DataTypes.STRING(50),
            field: 'first_name',
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            field: 'last_name'
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
        }
    });

    return User;
};