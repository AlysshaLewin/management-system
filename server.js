const express = require('express');
const expressLayouts = require('express-ejs-Layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./config/database');
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Connect To Database
connectDB();

//EJS Middleware
app.use(expressLayouts);

// set view engine
app.set('view engine', 'ejs');

//Bodyparser - included with Express
app.use(express.urlencoded({ extended: true }));

//Express Session Middleware
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Static Folder
app.use(express.static(__dirname + '/assets'));


//Routes - 
//for index.js file in routes folder
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users')); 



//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
    // console.log("Server is running, you better catch it!");
});