const express = require('express');
const SpHaCtrl = require('./sportHall.controller');

const router = express.Router();

router.get('/', SpHaCtrl.getAll);
router.post('/', SpHaCtrl.addSportHall);

module.exports = router;