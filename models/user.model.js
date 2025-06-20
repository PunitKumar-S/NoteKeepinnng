const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String
    }
})

const userModel = new mongoose.model('userModel', userSchema);

module.exports = userModel;

