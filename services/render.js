const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:6500/api/users')
        .then(function(response){
            res.render('dashboard', { userforms : response.data });
        })
        .catch(err =>{
            res.send(err);
        })    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}


exports.update_user = (req, res) =>{
    axios.get('http://localhost:6500/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { userforms : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}