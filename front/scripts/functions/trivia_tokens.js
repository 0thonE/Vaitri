'use strict'

let Trivia_Tokens = require('../schemas/trivia_tokensSchema');


function addTrivia_token(req, res){    

    let trivia_token = new Trivia_Tokens();

    let params = req.body;

    trivia_token.trivia = params.trivia;
    trivia_token.dateStart = params.dateStart;
    trivia_token.dateEnd = params.dateEnd;
    trivia_token.owner = params.owner;
    
    console.log(trivia_token);

    trivia_token.save((err, storedTrivia_token) => {
        if(err){
            console.log(err);
            res.status(500).send({mesage:'Server error.'});
        } else {
            if(!storedTrivia_token){
                res.status(404).send({message:'Error while saving.'});
            } else {
                res.status(201).send({message:'Trivia token created', trivia_token : storedTrivia_token});
            }
        }
    });
}

function getTrivias_tokens(req, res){
    console.log(req.query);

    Trivia_Tokens.find(req.query,(err, trivias_tokens) => {
    // Trivia_Tokens.find({trivia:triviaId},(err, trivias) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(Object.entries(trivias_tokens).length === 0){
                res.status(404).send({message: "No trivia's tokens found."});
            }else{
                res.status(200).send({message:`Trivia's tokens obtained`, results : trivias_tokens});
            }
        }
    });
}

function updateTrivia_token(req, res){
    let update = req.body;

    Trivia_Tokens.findOneAndUpdate(req.query, update, {new:true}, (err,updatedTrivia_token) =>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(!updatedTrivia_token){
                res.status(404).send({message: 'Could not update the trivia.'});
            }else{
                res.status(200).send({message:'Trivia updated', result : updatedTrivia_token})
            }
        }
    });
}

function deleteTrivia_Token(req, res){
    let triviaId = req.params.trivia_id;
    console.log(req.params);

    Trivia_Tokens.deleteOne({_id: triviaId}, (err,deletedTrivia_token) =>{
    // Trivia.deleteOne({_id: "5ebb5c02d633ce19c0b9ddc3"}, (err,deletedTrivia) =>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(!deletedTrivia_token){
                res.status(404).send({message: 'Could not delete the trivia.'});
            }else{
                res.status(200).send({message:'Trivia deleted', result : deletedTrivia_token})
            }
        }
    });
}

module.exports = {
    addTrivia_token,
    getTrivias_tokens,
    updateTrivia_token,
    deleteTrivia_Token,
};