const express = require('express');
const SpHaCtrl = require('./sportHall.controller');
const {hasToken,hasRole} = require('../user/middleware/token.middleware');
const {savePicture,savePictures} = require('./middleware/picture.middleware');

const router = express.Router();

router.get('/', SpHaCtrl.getAll);
router.get('/:id([0-9]+)', SpHaCtrl.getById);
router.get('/picture/:id([0-9]+)', SpHaCtrl.getPicture);
router.post('/', SpHaCtrl.addSportHall);
router.post('/mainPicture', SpHaCtrl.setMainPicture);
router.post('/booking' , hasToken , SpHaCtrl.addBooking);
router.post('/:id([0-9]+)/addpicture', savePicture ,SpHaCtrl.savePicture);
router.post('/:id([0-9]+)/addSeveralpictures', savePictures ,SpHaCtrl.savePictures);
router.post('/rempicture', SpHaCtrl.removePicture);
router.post('/confirm',hasRole(/*"admin"*/), SpHaCtrl.confirmBooking);//TODO check token admin


module.exports = router;