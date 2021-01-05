const { Model } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    class Role extends Model {
        static associate(models) {
            Role.belongsToMany(models.Users, {through:"UserRoles"})
        }
    }

    Role.init({
        name: {type: DataTypes.STRING, allowNull: false}
    }, {
        sequelize,
        modelName: 'Roles',
        timestamps: false
    });

    return Role;
}