const { Model } = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    class SportHall extends Model {
        static associate(models) {
            SportHall.hasMany(models.Bookings , { foreignKey: { allowNull: false} })
            SportHall.hasMany(models.Pictures , { foreignKey: { allowNull: false} })          
        }
    }

    SportHall.init({
        name: {type: Datatypes.STRING, allowNull: false},
        address: {type: Datatypes.STRING, allowNull: false},
        mainPicture: {type: Datatypes.STRING, allowNull: false}
    }, {
        sequelize,
        modelName: 'SportHalls',
        timestamps: false
    });

    return SportHall;
}