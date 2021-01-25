const express = require('express');
const SpHaCtrl = require('./sportHall.controller');
const {hasToken,hasRole} = require('../user/middleware/token.middleware');
const {savePicture,savePictures} = require('./middleware/picture.middleware');

const router = express.Router();

//TODO set middleware
router.get('/', SpHaCtrl.getAll);
router.get('/:id([0-9]+)', SpHaCtrl.getById);
router.get('/picture/:id([0-9]+)', SpHaCtrl.getPicture);
router.get('/event/:id([0-9]+)', SpHaCtrl.getEvent);//modo
router.post('/', SpHaCtrl.addSportHall);//admin
router.post('/mainPicture', SpHaCtrl.setMainPicture);//admin
router.post('/booking' , hasToken , SpHaCtrl.addBooking);//user
router.post('/:id([0-9]+)/addpicture', savePicture ,SpHaCtrl.savePicture);//admin
router.post('/:id([0-9]+)/addSeveralpictures', savePictures ,SpHaCtrl.savePictures);//admin
router.post('/rempicture', SpHaCtrl.removePicture);//admin
router.post('/confirm',hasRole("modo"), SpHaCtrl.confirmBooking);//modo|admin


module.exports = router;