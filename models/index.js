const {Sequelize, DataTypes} = require("sequelize");

const path = require('path');

const db = {};

let sequelize = new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, '..', 'db', 'db.sqlite3')});


db['SportHalls'] = require("../modules/sportHall/sportHall.model")(sequelize, DataTypes);

Object.keys(db).forEach(model => {
    console.log(model, db[model], db[model].associate);
    if (db[model].associate) {
        db[model].associate(db);
    }
})

db['sequelize'] = sequelize; //Instance de sequelize
db['Sequelize'] = Sequelize; //Le type Sequelize

module.exports = db;