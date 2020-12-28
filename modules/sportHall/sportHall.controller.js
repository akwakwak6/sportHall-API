const { SportHalls } = require('../../models');
const db = require('../../models');
const fs = require('fs')
const {pictureFolder} = require('../../config/db.config');
const { Op } = require("sequelize");

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
}; 

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

    setMainPicture({body:{sportHallId,pictureId}},res){
        db.SportHalls.findByPk(sportHallId)
        .then( sh => {
            sh.idMainPicture = pictureId
            return sh.save()
        })
        .then(_ => res.json())
        .catch(err => res.status(452).json(err))//TODO put better statu
    }

    getById(req,res){

        console.log("get ",req.params.id)

        //default all booking of this sport hall
        const bookingInclude = {model:db.Bookings,attributes:["id","start","end","message","payed"]}

        //If query start & end & are valid date => add filter only booking in the range bettween start & stop 
        if( req.query.start != undefined && req.query.end != undefined ){
            const startL = new Date(req.query.start)
            const end = new Date(req.query.end)
            if (startL.isValid() && end.isValid() && (startL < end)){
                bookingInclude.where = {start:{[Op.gte]: startL},end:{[Op.lte]: end}}
                bookingInclude.required = false
            }
        }


        db.SportHalls.findByPk(req.params.id,
            { include:[
                bookingInclude,
                {model:db.Pictures,attributes:["id"]}
            ]})
        .then( sh => res.json(sh) )
        .catch(err => res.json(err))
    }

    addBooking({body,token},res){
        const start = new Date(body.start)
        const end = new Date(body.end)
        const now = new Date()

        console.log("now ",now)
        // check dates => valides?, start before end? after now ?
        if (!start.isValid() || !end.isValid() || (start >= end) || (now > start) ) {
            res.status(409).json({msg:"invalid date"}) 
            return
        }
        //get period of booking in days
        const days = (end - start) / (60 * 60 * 24 * 1000)
        //TODO set max periode of booking in setting or in DB
        if( days > 10 ){
            res.status(409).json({msg:"invalid date"}) 
            return
        }

        const data = {...body}
        data.start = start
        data.end = end

        db.Bookings.create({...data,UserId:token.id})
        .then(_ => res.json() )
        .catch(err => res.status(405).json(err))
        
    }

    savePicture(req,res){
        db.Pictures.create({SportHallId:req.params.id,fileName:req.file.filename,name:req.file.originalname})
        .then(_=> res.json({ msg: 'Upload Works' }))
    }

    savePictures(req,res){

        const promises = []
        req.files.forEach( (f) => {
            promises.push( 
                db.Pictures.create({SportHallId:req.params.id,fileName:f.filename,name:f.originalname})
             )
        } )
        Promise.all(promises).then(_=> res.json({ msg: 'Upload Works' }))

    }

    getPicture({params:{id}},res){
        db.Pictures.findByPk(id)
        .then( p => {
            const path = pictureFolder + "/" + p.fileName
            res.download(path,p.name,(err)=> {
                res.json(err)
            })
        }).catch(err => res.json(err))
    }


    removePicture({body:{pictureId}},res){

        db.Pictures.findByPk(pictureId)
        .then( p => {
            const path = pictureFolder + "/" + p.name
            fs.unlink(path,(err)=> {
                db.Pictures.destroy( {where:{id:pictureId}})
                if(err){
                    res.json(err)//TODO !!! send error statu EVERY WHERE !!!
                    return
                }
                res.json({ msg: 'removed' });
            })
        }).catch(err => res.json(err))
        
    }


}

module.exports = new SprtHllController();