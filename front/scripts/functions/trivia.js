'use strict'

let Trivia = require('../schemas/triviaSchema');
let fs = require('fs')


function addTrivia(req, res){    

    let trivia = new Trivia();


    let params = req.body;

    trivia.name = params.name;
    trivia.description = params.description;
    trivia.date = params.date;
    trivia.owner = params.owner;
    // trivia.questions = params.questions;
    trivia.questions = params.questions.map((e)=>{
        let img="";
        let filename="poorfilename";
        if(e.img_src=""){
            img=e.img_src.replace("data:image/png;base64,", "");
            filename=Math.random().toString() + ".jpg"
            fs.writeFile("public/upload/"+filename,img,'base64',(err)=>{
                
            })
        }
        return ({
            text:e.text,
            points:e.points,
            answers:e.answers,
            image:fl,
            valid:e.valid,
            id:e.id,
        });
    });

    
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
    console.log(req.query);
    Trivia.find(req.query,(err, trivias) => {
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
function getMyTrivias(req, res){
    let ownerId = req.params.owner;

    Trivia.find({owner:ownerId},(err, myTrivias) => {
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
    Trivia.find({_id: triviaId},(err,trivia) => {
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

    Trivia.findOneAndUpdate({_id: triviaId}, update, {new:true}, (err,updatedTrivia) =>{
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

function deleteTriviaById(req, res){
    let triviaId = req.params.id;
    console.log(triviaId);

    Trivia.remove({_id: triviaId}, (err,deletedTrivia) =>{
        if(err){
            console.log(err);
            res.status(500).send({message: 'Server error.'});
        }else{
            if(!deletedTrivia){
                res.status(404).send({message: 'Could not update the trivia.'});
            }else{
                res.status(200).send({message:'Trivia deleted', result : deletedTrivia})
            }
        }
    });
}


function deleteTrivia(req, res){
    let triviaId = req.params.trivia_id;
    console.log(req.params);

    Trivia.remove({_id: triviaId}, (err,deletedTrivia) =>{
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
    addTrivia,
    getTrivias,
    getMyTrivias,
    getTriviaById,
    deleteTriviaById,
    updateTrivia,
    deleteTrivia,
    // deleteTriviaByOwner,
};