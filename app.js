const express = require("express")
const app = express()
const db = require('./config/database')
const bodyParser =  require ( 'body-parser' )
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const methodOverride = require('method-override');
const mongoose = require('mongoose')
const UserModel = require('./models/User');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




// bring passport 
app.use(passport.initialize())
app.use(passport.session())

//store user object 

app.get('*', (req,res,next)=> {
    res.locals.user = req.user || null
    next()
})



// bringg body parser 
// analyse de l'application / x-www-form-urlencoded 
app.use(express.static('public'))
app.use(express.static('node_modules'))




app.get('/', (req,res)=>{

    res.redirect('/products')
})
//bring product routes 
const products = require('./routes/product-routes')
app.use('/products',products)

// recipe 
const recipe = require('./routes/recipe-routes')
app.use('/recipe',recipe)
//bring user routes
mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt');
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/user-routes');
const secureRoute = require('./routes/secure-routes');

app.use('/', routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

//Handle errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

//listen t port 3000
app.listen(3000,()=>{

    console.log('app is working en port 3000')
})