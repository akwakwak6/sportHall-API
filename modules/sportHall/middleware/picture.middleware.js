const {pictureFolder} = require('../../../config/db.config')

const multer = require('multer');
const upload = multer({ dest: pictureFolder }).single('picture')//TODO set limit
const uploadArray = multer({ dest: pictureFolder }).array('picture')

const savePicture = (req,res,next) => {

    upload(req,res,(err) => {
        //TODO check if id is good ; req.params.id
        if(err){
            res.status(400).json(err)
            return
        }
        next()
    })

}

const savePictures = (req,res,next) => {

    uploadArray(req,res,(err) => {
        //TODO check if id is good ; req.params.id
        if(err){
            res.status(400).json(err)
            return
        }
        next()
    })

}

module.exports = {savePicture,savePictures}