const { Model } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    class UserRole extends Model {
    }

    UserRole.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          }
    }, {
        sequelize,
        modelName: 'UserRoles',
        timestamps: false
    });

    return UserRole;
}