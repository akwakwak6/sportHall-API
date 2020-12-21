const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    class SportHall extends Model {
        static associate(models) {
            /*SportHall.hasMany(models.Messages , { foreignKey: { allowNull: false} });
            SportHall.hasMany(models.signaledDis , { foreignKey: { allowNull: false} });
            SportHall.belongsTo(models.Users , { foreignKey: { allowNull: false} });*/
        }
    }

    SportHall.init({
        name: {type: Datatypes.STRING, allowNull: false},
        address: {type: Datatypes.STRING, allowNull: false}
    }, {
        sequelize,
        modelName: 'SportHalls',
        timestamps: false
    });

    return SportHall;
}