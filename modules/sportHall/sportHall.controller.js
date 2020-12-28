const { SportHalls } = require('../../models');
const db = require('../../models');
const fs = require('fs')
const {pictureFolder} = require('../../config/db.config')

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

    getById({params: {id}},res){
        db.SportHalls.findByPk(id,
            { include:[
                {model:db.Bookings,attributes:["id","start","end","message","payed"]},
                {model:db.Pictures,attributes:["id"]}
            ]})
        .then( sh => res.json(sh) )
        .catch(err => res.json(err))
    }

    addBooking(req,res){
    //TODO check date correct - start is before end - 3D > diff > 1D - if default Time of sportHall . . .
        /*var start = new Date(req.body.start); 
        console.log("-----> ",start)
        req.body.start = start.setHours(16)*/

        db.Bookings.create({...req.body,UserId:req.token.id})
        .then(b => res.json() )
        .catch(err => res.json(err))
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