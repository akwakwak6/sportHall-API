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
        db.SportHalls.findAll()
            .then( data => res.json(data) )
            .catch(err => res.status(400).json(err))
    }

    addSportHall({body},res){
        db.SportHalls.create({...body})
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err))
    }

    setMainPicture({body:{sportHallId,pictureId}},res){
        db.SportHalls.update({idMainPicture:pictureId},{where:{id:sportHallId}})
            .then(_ => res.json())
            .catch(err => res.status(400).json(err))
    }

    getById(req,res){

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
        .catch(err => res.status(400).json(err))
    }

    addBooking({body,token},res){
        const start = new Date(body.start)
        const end = new Date(body.end)
        const now = new Date()

        // check dates => valides?, start before end? after now ?
        if (!start.isValid() || !end.isValid() || (start >= end) || (now > start) ) {
            res.status(400).json({msg:"invalid date"}) 
            return
        }
        //get period of booking in days
        const days = (end - start) / (60 * 60 * 24 * 1000)
        //TODO set max periode of booking in setting or in DB
        if( days > 10 ){
            res.status(400).json({msg:"invalid date"}) 
            return
        }

        //TODO check data = body is useless,
        const data = {...body}
        data.start = start
        data.end = end

        db.Bookings.create({...data,UserId:token.id})
            .then(_ => res.json() )
            .catch(err => res.status(400).json(err))
        
    }

    savePicture(req,res){
        db.Pictures.create({SportHallId:req.params.id,fileName:req.file.filename,name:req.file.originalname})
            .then(_=> res.json())
            .catch(err => res.status(400).json(err))
    }

    savePictures(req,res){

        const promises = []
        req.files.forEach( (f) => {
            promises.push( 
                db.Pictures.create({SportHallId:req.params.id,fileName:f.filename,name:f.originalname})
             )
        } )
        Promise.all(promises)
            .then(_=> res.json())
            .catch(err => res.status(400).json(err))

    }

    getPicture({params:{id}},res){
        db.Pictures.findByPk(id)
        .then( p => {
            const path = pictureFolder + "/" + p.fileName
            res.download(path,p.name,(err)=> {
                if(err) res.status(400).json(err)
                else res.json()
            })
        })
        .catch(err => res.status(400).json(err))
    }


    removePicture({body:{pictureId}},res){

        db.Pictures.findByPk(pictureId)
        .then( p => {
            const path = pictureFolder + "/" + p.name
            fs.unlink(path,(err)=> {
                db.Pictures.destroy( {where:{id:pictureId}})
                if(err) res.status(400).json(err)
                else res.json()
            })
        })
        .catch(err => res.status(400).json(err))
        
    }

    confirmBooking(req,res){
        db.Bookings.update({payed:req.body.confirm},{where:{id:req.body.bookingId},individualHooks: true,confirmerID:req.token.id})
        .then( _ => res.json())
        .catch(err => res.status(400).json(err))
    }


}

module.exports = new SprtHllController();