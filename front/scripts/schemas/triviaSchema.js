const mongoose = require('mongoose');

let triviaSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    date:{
        type: String,
        required: false
    },
    questions:{
        type: Array,
        required: true,
    },
    owner:{
        type:String,
        required:true,
    }
})

let Trivia = mongoose.model('trivias', triviaSchema);
module.exports = Trivia;
