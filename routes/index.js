//anything thats /, /dashboard will go in here
const express = require('express');
//to use the express router
const router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome');
});



module.exports = router;