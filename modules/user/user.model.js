const { Model } = require('sequelize');

module.exports = function(sequelize, Datatypes) {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Roles, {through: 'User_Roles', timestamps: false,as: "Roles"})
            User.hasMany(models.Bookings)
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