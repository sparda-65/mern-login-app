const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

// Auth and Sing Up
router.post('/register',userController.register);


module.exports = router;