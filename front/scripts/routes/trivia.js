'use strict'

const express = require('express');
const UserController = require('../functions/trivia');
// const mdAuth = require('../middlewares/authenticate');

let api = express.Router();

api.post('/trivia', UserController.addTrivia);
api.get('/trivias',UserController.getTrivias);
api.get('/trivias/id/:id',UserController.getTriviaById);

module.exports = api;