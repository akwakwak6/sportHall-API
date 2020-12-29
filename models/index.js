const {Sequelize, DataTypes} = require("sequelize");

const path = require('path');

const db = {};

//TODO use db.config
let sequelize = new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, '..', 'db', 'db.sqlite3')});


db['SportHalls'] = require("../modules/sportHall/sportHall.model")(sequelize, DataTypes);
db['Roles'] = require("../modules/user/role.model")(sequelize, DataTypes);
db['Users'] = require("../modules/user/user.model")(sequelize, DataTypes);
db['Bookings'] = require("../modules/sportHall/booking.model")(sequelize, DataTypes);
db['LogConfirms'] = require("../modules/sportHall/logConfirm.model")(sequelize, DataTypes);
db['Pictures'] = require("../modules/sportHall/picture.model")(sequelize, DataTypes);
db['UserRoles'] = require("../modules/user/userRoles.model")(sequelize, DataTypes);


Object.keys(db).forEach(model => {
    console.log(model, db[model], db[model].associate);
    if (db[model].associate) {
        db[model].associate(db);
    }
})

db['sequelize'] = sequelize; //Instance de sequelize
db['Sequelize'] = Sequelize; //Le type Sequelize

module.exports = db;