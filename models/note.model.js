const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    }
});


const noteModel = new mongoose.model('noteModel', noteSchema);

module.exports = noteModel;
