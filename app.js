const db = require('./models');

db.sequelize.sync().then( _ => console.log("db synchronized") );