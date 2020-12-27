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


}

module.exports = new SprtHllController();