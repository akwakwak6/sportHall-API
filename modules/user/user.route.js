const express = require('express');
const UserController = require('./user.controller');
const {getPayloadOrUndefined,hasToken,hasRole} = require('./middleware/token.middleware');

const router = express.Router();

router.get('/',hasRole(/*"admin"*/), UserController.getAllUser);
router.put('/role',hasRole(/*"admin"*/), UserController.setRole);
router.post('/register', UserController.register);
router.post('/login', UserController.login);



module.exports = router;