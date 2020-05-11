'use strict'

const express = require('express');
const UserController = require('../functions/user');
const mdAuth = require('../middlewares/authenticate');

let api = express.Router();

api.post('/login',UserController.login);
api.post('/user', UserController.addUser);
api.get('/users',UserController.getUsers);
api.get('/user/username/:username',UserController.getUserByUsername);
api.patch('/user/:email',mdAuth.ensureAuth,UserController.updateUser);

module.exports = api;