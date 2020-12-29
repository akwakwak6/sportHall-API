const express = require('express');
const UserController = require('./user.controller');
const {getPayloadOrUndefined,hasToken,hasRole} = require('./middleware/token.middleware');

const router = express.Router();

router.get('/',hasRole(/*"admin"*/), UserController.getAllUser);//TODO uncomments admin
router.get('/:id([0-9]+)', UserController.getUserId);
router.put('/role',hasRole(/*"admin"*/), UserController.setRole);
router.post('/register', UserController.register);
router.post('/login', UserController.login);



module.exports = router;