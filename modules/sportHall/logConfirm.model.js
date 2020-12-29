const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    class LogConfirm extends Model {
        static associate(models) {
            LogConfirm.belongsTo(models.Bookings , { foreignKey: { allowNull: false} })
            LogConfirm.belongsTo(models.Users , { foreignKey: { allowNull: true} })
        }
    }

    LogConfirm.init({
        hasConfirmed : {type: DataTypes.BOOLEAN, allowNull:true},
    }, {
        sequelize,
        modelName: 'LogConfirms'
    });

    return LogConfirm;
}