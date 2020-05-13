const mongoose = require('mongoose');

let trivia_tokensSchema = mongoose.Schema({
    trivia:{
        type: String,
        required: true,
    },
    dateStart:{
        type: Date,
        required: true,
    },
    dateEnd:{
        type: Date,
        required: true,
    },
    owner:{
        type:String,
        required:true,
    }
})

let Trivia_Tokens = mongoose.model('trivia_tokens', trivia_tokensSchema);
module.exports = Trivia_Tokens;
