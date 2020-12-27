
const db = require('../models');
const {auth,logger} = require('../utils')
const {configRoles,configUsers} = require('../config/db.config')


module.exports = () => { //TODO use sequelize-cli
    console.log("Database was synchronized")


    db.Roles.findAndCountAll().then( c => {// if role table is empty => add role and admin user
        if(c.count === 0){
            const promiseArray = []
            configRoles.forEach(r => promiseArray.push(db.Roles.create(r)))
            configUsers.forEach( u =>{
                promiseArray.push(auth.hashPwd(u.password)
                .then(pwd => {
                    const user = {...u}
                    user.password = pwd
                    return db.Users.create(user)
                } )
                .then(u => u.setRoles(1)))
            })
            Promise.all(promiseArray)
            .then(_=> logger.info("init db","inserted roles and users from setting"))//TODO use logger
            .catch(_=> {
                logger.error("init db","error in insert roles or users from setting, probably error in db.config.js",true)
            })
        }
    })
}