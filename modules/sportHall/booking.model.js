const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    class Booking extends Model {
        static associate(models) {
            Booking.belongsTo(models.SportHalls , { foreignKey: { allowNull: false} })
            Booking.belongsTo(models.Users , { foreignKey: { allowNull: false} })
            Booking.hasMany(models.LogConfirms , { foreignKey: { allowNull: false} })
        }
    }

    Booking.init({
        start: {type: Datatypes.DATE, allowNull: false},
        end: {type: Datatypes.DATE, allowNull: false},
        payed : {type: Datatypes.BOOLEAN, allowNull: false, defaultValue:false},
        message : {type: DataTypes.STRING, allowNull:true}
    }, {
        sequelize,
        modelName: 'Bookings'
    });

    
    Booking.afterUpdate( async (booking, options) => {
        if(booking.dataValues.payed === booking._previousDataValues.payed)  return        
        booking.createLogConfirm({hasConfirmed:booking.dataValues.payed,UserId:options.confirmerID})
    })

    return Booking;
}