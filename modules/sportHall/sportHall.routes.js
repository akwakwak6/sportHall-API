const express = require('express');
const SpHaCtrl = require('./sportHall.controller');
const {hasToken} = require('../user/middleware/token.middleware');
const {savePicture,savePictures} = require('./middleware/picture.middleware');

const router = express.Router();

router.get('/', SpHaCtrl.getAll);
router.get('/:id([0-9]+)', SpHaCtrl.getById);
router.post('/', SpHaCtrl.addSportHall);
router.post('/booking', hasToken , SpHaCtrl.addBooking);
router.post('/:id([0-9]+)/addpicture', savePicture ,SpHaCtrl.savePicture);
router.post('/:id([0-9]+)/addSeveralpictures', savePictures ,SpHaCtrl.savePictures);
router.post('/rempicture', SpHaCtrl.removePicture);
router.get('/picture/:id([0-9]+)', SpHaCtrl.getPicture);


module.exports = router;