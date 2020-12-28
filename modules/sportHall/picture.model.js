const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    class Picture extends Model {
        static associate(models) {
            Picture.belongsTo(models.SportHalls , { foreignKey: { allowNull: false} })
        }
    }

    Picture.init({
        name : {type: DataTypes.STRING, allowNull:false},
        fileName : {type: DataTypes.STRING, allowNull:false},
    }, {
        sequelize,
        modelName: 'Pictures',
        timestamps: false
    });

    return Picture;
}