'use strict'

const express = require('express');
const UserController = require('../functions/trivia');
const mdAuth = require('../middlewares/authenticate');

let api = express.Router();

api.post('/trivia',mdAuth.ensureAuth, UserController.addTrivia);
api.get('/trivias',mdAuth.ensureAuth,UserController.getTrivias);
api.get('/trivias/:owner',mdAuth.ensureAuth,UserController.getMyTrivias);
// api.get('/trivias/:_id',UserController.getTriviaById);
// api.delete('/trivias/:owner',UserController.deleteTriviaByOwner);
api.get('/trivia/:id',mdAuth.ensureAuth,UserController.getTriviaById);
api.patch('/trivia/:id',mdAuth.ensureAuth,UserController.updateTrivia);
api.delete('/trivia/:id',mdAuth.ensureAuth,UserController.deleteTriviaById);


// api.delete('/trivias',mdAuth.ensureAuth,UserController.deleteTrivia);
// api.delete('/trivias/:trivia_id',mdAuth.ensureAuth,UserController.deleteTrivia);

module.exports = api;