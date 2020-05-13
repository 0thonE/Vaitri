'use strict'

const express = require('express');
const UserController = require('../functions/trivia_tokens');
// const mdAuth = require('../middlewares/authenticate');

let api = express.Router();

api.post('/trivia_token', UserController.addTrivia_token);
api.get('/trivia_tokens',UserController.getTrivias_tokens);
// api.get('/trivia_tokens/:owner',UserController.getMytTokensT);

module.exports = api;