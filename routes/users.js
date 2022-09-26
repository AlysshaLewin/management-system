//anything thats /users, /login will go in here
const express = require('express');
//to use the express router:
const router = express.Router();

//Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

//Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    //Check if passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Checks if password is at least 6 characters long
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    //if any errors are found rerender registration form, if none found then pass
    if(errors.length > 0) {
        //if page rerenders, form will NOT completely clear so user do not have to retype all data
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        res.send('pass');
    }

});


module.exports = router;