const db = require('./models');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {SportHallRouter} = require("./modules/sportHall");
const {UserRouter} = require("./modules/user");
const initDB = require("./models/initDb.model")
var cors = require('cors')

db.sequelize.sync().then( _ => initDB(db) );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', function (req, res) {
    res.send('Welcome to my booking app')
})

app.use('/sportHall', SportHallRouter);
app.use('/user', UserRouter);


app.listen(3000,_=>console.log("server listen"))