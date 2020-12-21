const { SportHalls } = require('../../models');
const db = require('../../models');

class SprtHllController {

    getAll( req,res){
        res.json({ok:"it works"})
    }


}

module.exports = new SprtHllController();