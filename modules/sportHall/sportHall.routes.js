const express = require('express');
const SpHaCtrl = require('./sportHall.controller');
const {hasToken} = require('../user/middleware/token.middleware');

const router = express.Router();

router.get('/', SpHaCtrl.getAll);
router.get('/:id([0-9]+)', SpHaCtrl.getById);
router.post('/', SpHaCtrl.addSportHall);
router.post('/booking',hasToken, SpHaCtrl.addBooking);


module.exports = router;