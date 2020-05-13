const mongoose = require('mongoose');

let answersSchema = mongoose.Schema({
    trivia:{
        type: String,
        required: true,
    },
    trivia_token:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    score:{
        type:String,
        required:true,
    }
})

let Answers = mongoose.model('answers', answersSchema);
module.exports = Answers;
