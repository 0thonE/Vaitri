'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();


app.use(cors())

//cargar rutas
let userRoutes = require('./routes/user');

//middleware de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/../examples"))
app.use(express.static(__dirname + "/../../front"))



//Rutas Base
app.use('/api',userRoutes);//se declaran todas las rutas como api

module.exports = app;