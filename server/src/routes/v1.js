const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users.controller');
const popController = require('../controllers/Pops.controller');

// Auth and Sing Up
router.post('/register', userController.register);
router.post('/auth', userController.login);

// protected routes are above
router.all('*', (req, res, next) => {
    passport.authenticate('jwt', { session: true }, (err, user) => {
        if (err || !user) {
            const error = new Error("you are not Authorized to acces this area");
            error.status = 401;
            next(error);
        }
        req.user = user;
        return next();
    })(req, res, next);
});


//---------Protected Routes------------
router.get('/me', userController.me);
router.get('/test', (req, res, next) => {
    return res.send({
        message: "you are authenticated",
    });
});

router.post('/pop', popController.create);
router.get('/pop', popController.get);
router.delete('/pop/:pop_id', popController.destroy);
router.put('/pop/:pop_id', popController.update);
module.exports = router;