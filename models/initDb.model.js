
const db = require('../models');
const {auth} = require('../utils')


module.exports = () => { //TODO use sequelize-cli
    console.log("Database was synchronized")
    db.Roles.findAndCountAll().then( c => {// if role table is empty => add role and admin user
        if(c.count === 0){
            db.Roles.create({name:"admin",id:1}).then(
                (r)=> {
                    auth.hashPwd("admin")
                    .then(pwd => db.Users.create({mail:"admin@com",RoleId:1,	password:pwd, name:"admin"}))
                    .then(u => u.setRoles(r))})
            db.Roles.create({name:"modo",id:2})
            db.Roles.create({name:"user",id:3})
            
        }
    })
}