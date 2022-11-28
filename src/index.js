const express=require('express');
const engine= require('ejs-mate');
const path=require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
//inicializaciones
const app=express();
require('./database');
require('./passport/local-auth');
//setting up the server
//indicando la ruta de las vistas
app.set('views',path.join(__dirname,'views'));
const port=process.env.port || 3000;
app.engine('ejs',engine);
app.set('view engine','ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//Configurando sesion
app.use(session({
    secret:'sesionCENIDET', //USAR VARIABLE DE ENTORNO
    resave:false,
    saveUninitialized:false
}))
app.use(flash()); //debe ir despues de session y antes de passport
app.use(passport.initialize());
app.use(passport.session());

//Haciendo disponible el mensaje de flash
app.use((req,res,next)=>{
    app.locals.signupMessage=req.flash('signupMessage');//signupMessage:nombre de la variable
    app.locals.signinMessage=req.flash('signinMessage');
    next();
})
//requerimos las rutas
app.use('/',require('./routes/routes'));

//starting the server
app.listen(port,()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
}
);
