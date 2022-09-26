const express = require('express');
const expressLayouts = require('express-ejs-Layouts');
const mongoose = require('mongoose');
const connectDB = require('./config/database');


const app = express();

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Connect To Database
connectDB();

//EJS Middleware
app.use(expressLayouts);

// set view engine
app.set('view engine', 'ejs');

//Bodyparser - included with Express
app.use(express.urlencoded({ extended: false }));


//Routes - 
//for index.js file in routes folder
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users')); 



//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
    // console.log("Server is running, you better catch it!");
});