//anything thats /users, /login will go in here
const express = require('express');
//to use the express router:
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// const services = require('../services/render');
// const controller = require('../controller/controller');


//Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');


//Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));


//Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  //Checks required fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
    //Check if passwords match
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
    //Checks if password is at least 6 characters long
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    //if any errors are found rerender registration form, if none found then pass
    if (errors.length > 0) {
      //if page rerenders, form will NOT completely clear so user do not have to retype all data
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      //Validation passed
      User.findOne({ email: email }).then(user => {
        if (user) {
          //User exists
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          //Hash Password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //Set password to hashed
              newUser.password = hash;
              //Save user
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
});

//Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
});
  
// Logout
router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});



module.exports = router;