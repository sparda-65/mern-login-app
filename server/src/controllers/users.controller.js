const User= require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../actions/validation');
const userController ={};

/**
 * Sing up Logic
 */
userController.register = async (req, res, next) => {
    //User validation befor Save
    const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    // check if e-mail existe on DB
    const emailexist= await User.findOne({email:req.body.email});
    if(emailexist) return res.status(400).send('email already existe');

    // check if username existe on DB
    const usernameexist= await User.findOne({username:req.body.username});
    if(usernameexist) return res.status(400).send('username already existe');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    
    // save user on DB
    try {
        const savedUser = await user.save();
        res.send({user: user._id}); 
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = userController;