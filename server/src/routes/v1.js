const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users.controller');

// Auth and Sing Up
router.post('/register',userController.register);
router.post('/auth',userController.login);

router.get('/test',passport.authenticate('jwt',{session: true}) ,(req, res, next)=>{
    return res.send({
        message: "you are authenticated"
    });
})
module.exports = router;