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
//Aplicando middleware Lanza Error
/*
router.use((req, res, next) => {
    isAuth(req, res, next);
    next();
});
*/
//Extra perfil
router.get('/profile',isAuth,(req, res,next) => {
    res.render('profile');
});
//Cerrar sesion
router.get('/logout',isAuth, (req, res,next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/signin');
      });
});
//Middleware
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}


module.exports = router;