const { Model } = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Roles, {through:models.UserRoles, as: "Roles"})
            User.hasMany(models.Bookings , { foreignKey: { allowNull: false} })
            User.hasMany(models.LogConfirms , { foreignKey: { allowNull: false} })
        }
    }

    User.init({
        name: {type: Datatypes.STRING, allowNull: false},
        password: {type: Datatypes.STRING, allowNull: false},
        mail: {type: Datatypes.STRING, allowNull: false, unique:true},
        isActive: {type: Datatypes.BOOLEAN, allowNull: false,defaultValue:true },
    }, {
        sequelize,
        modelName: 'Users'
    });

    return User;
}