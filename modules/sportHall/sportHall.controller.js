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
        db.SportHalls.findByPk(id,{include:{model:db.Bookings,attributes:["id","start","end","message","payed"]}})
        .then( sh => res.json(sh) )
        .catch(err => res.json(err))
    }

    addBooking(req,res){
        //TODO check date correct - start is before end - . . .
        /*var start = new Date(req.body.start); 
        console.log("-----> ",start)
        req.body.start = start.setHours(16)*/

        db.Bookings.create({...req.body,UserId:req.token.id})
        .then(b => res.json() )
        .catch(err => res.json(err))
    }

    savePicture(req,res){
        res.json(req.body)
    }


}

module.exports = new SprtHllController();