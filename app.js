const db = require('./models');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {SportHallRouter} = require("./modules/sportHall/sportHall.index");

db.sequelize.sync().then( _ => console.log("db synchronized") );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to my booking app')
})

app.use('/sportHall', SportHallRouter);

app.listen(3000,_=>console.log("server listen"))