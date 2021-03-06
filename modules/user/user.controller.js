const db = require('../../models')
const {auth} = require('../../utils')

const getUserDate = (id) => {
    return db.Users.findByPk(id , {attributes:["id","name","mail"],include:[ {model:db.Bookings},{model:db.LogConfirms},"Roles"]} )
}


class UserController {

    register({body}, res) {
        const user = {...body};
        auth.hashPwd(user.password).then(pw => {
                user.password = pw
                return db.Users.create({...user})
            })
        //.then(u => res.json( {token:auth.geneToken(u)} ))
        .then(u => {
            getUserDate(u.id).then( userData => res.json({token:auth.geneToken(u),user:userData})  )
        })
        .catch(err => res.status(400).json(err))
    }

    login({body: {mail, password} }, res){//TODO check if isActive => X Error => lock
        db.Users.findOne( { where:{mail} , attributes:["id","name","password"], include:'Roles' } )
        .then(u => {return auth.checkUser(u,password)})
        .then(u => {
            getUserDate(u.id).then( userData => res.json({token:auth.geneToken(u),user:userData})  )
        })
        .catch(err => res.status(400).json(err))
    }

    setIsActive({body: {userId,enable}},res){

        db.Users.update({isActive:enable},{where:{id:userId}})
        .then(_=>res.json())
        .catch(err => res.status(400).json(err))
    }

    setRole({body: {roleId,userId,enable}},res){
        db.Users.findByPk(userId)
        .then(u => {
            if(enable)
                return u.addRoles(roleId)
            else
                return u.removeRoles(roleId)
        })
        .then(_=> res.json())
        .catch(err => res.status(400).json(err))
    }

    getAllUser(req,res){
        db.Users.findAll({ attributes:["id","name","isActive"], include:'Roles' })//TODO add attribut in roles tab
        .then(u => res.json(u))
        .catch(err => res.status(400).json(err))
    }

    getUserId({params:{id}},res){
        db.Users.findByPk(id , {attributes:["id","name","mail"],include:[{model:db.Roles, as:"Roles", through: { attributes: [] } } , {model:db.Bookings},{model:db.LogConfirms}]} )
        .then(u => res.json(u))//res.json({username: u.username, roles: u.Roles})
        .catch(err => res.status(400).json(err))
    }

}

module.exports = new UserController();