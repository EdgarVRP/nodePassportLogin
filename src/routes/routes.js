const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res,next) => {
    res.render('index');
});
//Se envia formulario
router.get('/signup', (req, res,next) => {
    res.render('signup');
});
//Se recibe formulario
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', //se coloca donde se quiere redireccionar
    failureRedirect: '/signup',
    passReqToCallback: true
}));


router.get('/signin', (req, res,next) => {
    res.render('signin');
});
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile', //se coloca donde se quiere redireccionar
    failureRedirect: '/signup',
    passReqToCallback: true
}));
//Extra perfil
router.get('/profile', (req, res,next) => {
    res.render('profile');
});
module.exports = router;