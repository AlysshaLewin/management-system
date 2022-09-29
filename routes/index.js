//anything thats /, /dashboard will go in here
const express = require('express');
//to use the express router
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//Add User
router.get("/add-user", (req, res) => {
  res.render('add_user');
});

module.exports = router;