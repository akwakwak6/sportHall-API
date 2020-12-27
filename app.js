const db = require('./models');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {SportHallRouter} = require("./modules/sportHall");
const {UserRouter} = require("./modules/user");
const initDB = require("./models/initDb.model")

db.sequelize.sync().then( _ => initDB(db) );

//put role to user id
//config file => . . . 

//booking table
//add booking
//add sport hall
//get sport hall ID
//get booking for sport hall


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to my booking app')
})

app.use('/sportHall', SportHallRouter);
app.use('/user', UserRouter);


app.listen(3000,_=>console.log("server listen"))