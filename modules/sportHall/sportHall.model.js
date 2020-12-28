const { Model, DataTypes } = require('sequelize');

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
        idMainPicture: {type: Datatypes.INTEGER, allowNull: true}//no way to creat asssociation, sportHall -> pictures -> sportHall
    }, {
        sequelize,
        modelName: 'SportHalls',
        timestamps: false
    });

    return SportHall;
}