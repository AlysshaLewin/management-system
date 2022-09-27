const LocalStrategy = require('passport-local').Strategy;
//need to decrypt the hash to make sure passwords match - compares hash to plain text
const bcrypt = require('bcryptjs');

//Load User Model
const User = require('../models/User');


//exports passport functionality from server.js file
module.exports = function(passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Match user in db
        User.findOne({
          email: email
        }).then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }
  
          // Match password in db
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        });
      })
    );

    //serializes and deserializes user - uses unique cookie that identifies session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
};