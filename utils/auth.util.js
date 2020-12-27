const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accessTokenSecret = 'azerty';//TODO set secret in config file

class Auth {

    hashPwd = (pwd) => {
        return bcrypt.hash(pwd, 5)
    }

    checkUser = (user,pwd) => {
        return new Promise((s,f)=> {
            if( user === null ){
                f("no user")
                return
            }
            bcrypt.compare(pwd, user.password).then(
                (result)  => {
                    if( result === true )   s(user)
                    else f("error pwd")
                }
            )
        })
    }

    geneToken = (u) => {

        if( u.Roles === undefined ) u.Roles = []
        const user = {id:u.id,name:u.name}
        user.roles = u.Roles.map(r => r.name)
        return jwt.sign(user, accessTokenSecret, { expiresIn: '1h' });
    }

    getPayLoad = (token) => {
        try{
            return jwt.verify(token,accessTokenSecret)
        }catch{
            return undefined
        }
    }
}

module.exports = new Auth();