module.exports = function(sequelize, DataTypes) {

    const State = sequelize.define('state', {
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
    },
    {
        timestamps: false
    });

    return State;
};