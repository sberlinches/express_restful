module.exports = function(sequelize, DataTypes) {

    var State = sequelize.define('state', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            field: 'name',
            allowNull: false
        },
        countryId: {
            type: DataTypes.INTEGER,
            field: 'country_id',
            allowNull: false
        }
    });

    return State;
};