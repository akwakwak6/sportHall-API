const { Model, DataTypes } = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    class Picture extends Model {
        static associate(models) {
            Picture.belongsTo(models.SportHalls , { foreignKey: { allowNull: false} })
        }
    }

    Picture.init({
        description : {type: DataTypes.STRING, allowNull:true},
        name : {type: DataTypes.STRING, allowNull:false},
    }, {
        sequelize,
        modelName: 'Pictures',
        timestamps: false
    });

    return Picture;
}