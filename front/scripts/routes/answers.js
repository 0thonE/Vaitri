'use strict'

const express = require('express');
const UserController = require('../functions/answers');

let api = express.Router();

api.post('/answer', UserController.addAnswer);
api.get('/answers',UserController.getAnswers);

module.exports = api;