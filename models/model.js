const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const Userform = mongoose.model('Userform', FormSchema);

module.exports = Userform;