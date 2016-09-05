module.exports = function(sequelize, DataTypes) {

    var Country = sequelize.define('country', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(2),
            field: 'code',
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(50),
            field: 'name',
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    return Country;
};