'use strict'

const express = require('express');
const UserController = require('../functions/trivia');
// const mdAuth = require('../middlewares/authenticate');

let api = express.Router();

api.post('/trivia', UserController.addTrivia);
api.get('/trivias',UserController.getTrivias);
api.get('/trivias/:owner',UserController.getMyTrivias);
// api.get('/trivias/:_id',UserController.getTriviaById);
// api.delete('/trivias/:owner',UserController.deleteTriviaByOwner);
api.delete('/trivias',UserController.deleteTrivia);
api.delete('/trivias/:trivia_id',UserController.deleteTrivia);

module.exports = api;