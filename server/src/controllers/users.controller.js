const User= require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../actions/validation');
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
        res.send({
            user: user._id,
            savedUser
        }); 
    } catch (error) {
        res.status(400).send(error);
        next(error)
    }
};

/**
 * Login Logic
 */
userController.login = async (req, res, next) => {

    //User validation befor login
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        // check if e-mail existe 
        const user= await User.findOne({email:req.body.email});
        if(!user) {
            const err = new Error(`The email ${req.body.email} was not found`);
            err.status = 401;
            next(err);
        }
        else{
            // compare password with the hash
            const validPass= await bcrypt.compare(req.body.password , user.password);
            if(!validPass){
                const err = new Error(`Invalide user/password combination`);
                err.status = 401;
                next(err);
            }else{
                //assign a token
                const token =jwt.sign({_id: user._id} , process.env.TOKEN_SECRET,{expiresIn: process.env.TOKEN_EXPIRATION });
                res.header('Authorization', token).send({
                    message:'you can login',
                    token
                });
            } 
        }
    }catch(e){
        next(e);
    }

};


module.exports = userController;