const { SportHalls } = require('../../models');
const db = require('../../models');

class SprtHllController {

    getAll( req,res){
        db.SportHalls.findAll().then( (data) => {
            res.json(data);
        } ).catch(err => res.json(err));
    }

    addSportHall({body},res){
        db.SportHalls.create({...body})
            .then(user => res.status(203).json(user))
            .catch(err => res.json(err));
    }

    getById({params: {id}},res){
        db.SportHalls.findByPk(id,{include:db.Bookings})
        .then( sh => res.json(sh) )
        .catch(err => res.json(err))
    }

    addBooking(req,res){
        //TODO check date correct - start is before end - shId (in db)
        //TODO add attribut => id,start,end,msg,payed
        db.Bookings.create({...req.body,UserId:req.token.id})
        .then( res.json() )
        .catch(err => res.json(err))
    }


}

module.exports = new SprtHllController();