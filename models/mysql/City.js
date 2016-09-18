module.exports = function(sequelize, DataTypes) {

    const City = sequelize.define('city', {
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
        stateId: {
            type: DataTypes.INTEGER,
            field: 'state_id',
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    return City;
};