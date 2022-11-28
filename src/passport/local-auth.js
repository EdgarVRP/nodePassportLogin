const passport = require('passport');
const user = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const users=require('../models/user');

//serializando y deserializando el usuario
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async (id,done)=>{
    const user=await users.findById(id);
    done(null,user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //permite pasar el req al callback
}, async (req, email, password, done) => {
    //Haciendo validacion
    const user= await users.findOne({'email': email})
    console.log(user)
    if(user){
        return done(null,false,req.flash('signupMessage','El correo ya esta en uso'));
    }else{
    const newuser=new users();
    newuser.email=email;
    newuser.password=newuser.encryptPassword(password); //Para encriptar las contraseñas
    newuser.telefono=req.body.telefono;
    await newuser.save();
    done(null,newuser);
    }
}
));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //permite pasar el req al callback
}, async (req, email, password, done) => {
    //Haciendo validacion
    const user= await users.findOne({'email': email})
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'Usuario NO encontrado'));
    }
    if (!user.matchPassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    done(null, user);
}
));