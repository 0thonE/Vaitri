'use strict'

let Trivia = require('../schemas/triviaSchema');


function addTrivia(req, res){    

    let trivia = new Trivia();


    let params = req.body;

    trivia.name = params.name;
    trivia.description = params.description;
    trivia.date = params.date;
    trivia.questions = params.questions;
    trivia.owner = params.owner;
    
    console.log(trivia);

    trivia.save((err, storedTrivia) => {
        if(err){
            console.log(err);
            res.status(500).send({mesage:'Server error.'});
        } else {
            if(!storedTrivia){
                res.status(404).send({message:'Error while saving.'});
            } else {
                res.status(201).send({message:'Trivia created', trivia : storedTrivia});
            }
        }
    });
}

function getTrivias(req, res){
    Trivia.find({},(err, trivias) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(Object.entries(trivias).length === 0){
                res.status(404).send({message: 'No trivias found.'});
            }else{
                res.status(200).send({message:'Trivias obtained', results : trivias});
            }
        }
    });
}

function getTriviaById(req,res){
    let triviaId = req.params.id;
    Trivia.find({id: triviaId},(err,trivia) => {
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

    Trivia.findOneAndUpdate({id: triviaId}, update, {new:true}, (err,updatedTrivia) =>{
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
    let triviaId = req.params.id;

    Trivia.deleteOne({id: triviaId}, (err,deletedTrivia) =>{
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


module.exports = {
    addTrivia,
    getTrivias,
    getTriviaById,
    updateTrivia,
    deleteTrivia,
};