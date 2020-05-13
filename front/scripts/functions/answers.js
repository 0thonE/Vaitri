'use strict'

let Trivia_Tokens = require('../schemas/answersSchema');


function addAnswer(req, res){    

    let trivia_token = new Trivia_Tokens();

    let params = req.body;

    trivia_token.trivia = params.trivia;
    trivia_token.dateStart = params.dateStart;
    trivia_token.dateEnd = params.dateEnd;
    trivia_token.owner = params.owner;
    
    console.log(trivia_token);

    trivia_token.save((err, storedTrivia) => {
        if(err){
            console.log(err);
            res.status(500).send({mesage:'Server error.'});
        } else {
            if(!storedTrivia){
                res.status(404).send({message:'Error while saving.'});
            } else {
                res.status(201).send({message:'Trivia token created', trivia : storedTrivia});
            }
        }
    });
}

function getTrivias_Tokens(req, res){
    let triviaId=req.params;
    console.log(req.query);

    Trivia_Tokens.find(req.query,(err, trivias) => {
    // Trivia_Tokens.find({trivia:triviaId},(err, trivias) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(Object.entries(trivias).length === 0){
                res.status(404).send({message: "No trivia's tokens found."});
            }else{
                res.status(200).send({message:`Trivia's tokens obtained`, results : trivias});
            }
        }
    });
}

function getMyTrivias(req, res){
    let ownerId = req.params.owner;

    Trivia_Tokens.find({owner:ownerId},(err, myTrivias) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(Object.entries(myTrivias).length === 0){
                res.status(404).send({message: 'No trivias found.'});
            }else{
                res.status(200).send({message:'Trivias obtained', results : myTrivias});
            }
        }
    });
}

function getTriviaById(req,res){
    let triviaId = req.params.id;
    Trivia_Tokens.find({id: triviaId},(err,trivia) => {
        if(err){
            res.status(500).send({message: 'Server error.'});
        }else{
            if(Object.entries(trivia).length === 0){
                res.status(404).send({message: 'Trivia not found.'});
            }else{
                res.status(200).send({message:'Trivia obtained', result : trivia});
            }
        }
    });
}

function updateTrivia(req, res){
    let triviaId = req.params.id;
    let update = req.body;

    Trivia_Tokens.findOneAndUpdate({id: triviaId}, update, {new:true}, (err,updatedTrivia) =>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(!updatedTrivia){
                res.status(404).send({message: 'Could not update the trivia.'});
            }else{
                res.status(200).send({message:'Trivia updated', result : updatedTrivia})
            }
        }
    });
}

function deleteTrivia(req, res){
    let triviaId = req.params.trivia_id;
    console.log(req.params);

    Trivia_Tokens.deleteOne({_id: triviaId}, (err,deletedTrivia) =>{
    // Trivia.deleteOne({_id: "5ebb5c02d633ce19c0b9ddc3"}, (err,deletedTrivia) =>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(!deletedTrivia){
                res.status(404).send({message: 'Could not delete the trivia.'});
            }else{
                res.status(200).send({message:'Trivia deleted', result : deletedTrivia})
            }
        }
    });
}

// function deleteTriviaByOwner(req, res){
//     let ownerId = req.params.owner;
//     console.log(req.params);

//     Trivia.deleteMany({owner: ownerId}, (err,deletedTrivia) =>{
//     // Trivia.deleteMany({_id: ownerId}, (err,deletedTrivia) =>{
//     // Trivia.deleteOne({_id: "5ebb5c02d633ce19c0b9ddc3"}, (err,deletedTrivia) =>{
//         if(err){
//             console.log(err);
//             res.status(500).send({message: 'Server error.'});
//         }else{
//             if(!deletedTrivia){
//                 res.status(404).send({message: 'Could not delete the trivia.'});
//             }else{
//                 res.status(200).send({message:'Trivia deleted', result : deletedTrivia})
//             }
//         }
//     });
// }


module.exports = {
    addTrivia_token: addAnswer,
    getTrivias_Tokens,
    getMyTrivias,
    getTriviaById,
    updateTrivia,
    deleteTrivia,
    // deleteTriviaByOwner,
};