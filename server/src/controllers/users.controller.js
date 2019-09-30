const User= require('../models/user.model.js');
const userController ={};

/**
 * Sing up Logic
 */
userController.register = (req, res, next) => {
    res.send({
        message :` Sing Up`
    });
};

module.exports = userController;