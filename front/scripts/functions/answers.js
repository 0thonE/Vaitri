'use strict'

let Answer = require('../schemas/answersSchema');


function addAnswer(req, res){    

    let answer = new Answer();

    let params = req.body;

    answer.trivia = params.trivia;
    answer.trivia_token = params.trivia_token;
    answer.username = params.username;
    answer.date = params.date;
    answer.score = params.score;
    
    console.log(answer);

    answer.save((err, storedAnswer) => {
        if(err){
            console.log(err);
            res.status(500).send({mesage:'Server error.'});
        } else {
            if(!storedAnswer){
                res.status(404).send({message:'Error while saving.'});
            } else {
                res.status(201).send({message:'Your answer has been submited', answer : storedAnswer});
            }
        }
    });
}

function getAnswers(req, res){
    console.log(req.query);

    Answer.find(req.query,(err, answers) => {
    // Trivia_Tokens.find({trivia:triviaId},(err, trivias) => {
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(Object.entries(answers).length === 0){
                res.status(404).send({message: "No answers were found."});
            }else{
                res.status(200).send({message:`Answers obtained`, results : answers});
            }
        }
    });
}

module.exports = {
    addAnswer,
    getAnswers,
};