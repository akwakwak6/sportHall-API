const db = require('./models');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {SportHallRouter} = require("./modules/sportHall");
const {UserRouter} = require("./modules/user");
const initDB = require("./models/initDb.model")

//TODO plan
// => mainPictue in sportHall 
// => setMainPicture in sportHall
// => check time start and stop for booking, in the future, more than 1 hour less than 3D, start before end . . . 
// => getSportHAll by id with booking date range
// => confirm booking payd
// => log user who confirm payed
// => get this log => this log for bookig id
// => res.statu = X if error (catch) EVERY WHERE
// => 

db.sequelize.sync().then( _ => initDB(db) );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to my booking app')
})

app.use('/sportHall', SportHallRouter);
app.use('/user', UserRouter);


app.listen(3000,_=>console.log("server listen"))