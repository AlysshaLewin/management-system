//anything thats /, /dashboard will go in here
const express = require('express');
//to use the express router
const router = express.Router();
const axios = require('axios');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//HomeRoute
exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:5000/api/users')
      .then(function(response){
          res.render('dashboard', { userforms : response.data });
      })
      .catch(err =>{
          res.send(err);
      })    
}

//Add User
router.get("/add-user", (req, res) => {
  res.render('add_user');
});

//Update User
router.get('http://localhost:5000/api/users', { params : { id : req.query.id }})
  .then(function(userdata){
    res.render("update_user", { userforms : userdata.data})
})
  .catch(err =>{
    res.send(err);
});


module.exports = router;