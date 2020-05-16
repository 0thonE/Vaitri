'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();


app.use(cors());
//cargar rutas
let userRoutes = require('./routes/user');
let triviaRoutes = require('./routes/trivia');
let Trivia_TokensRoutes = require('./routes/trivia_tokens');
let answersRoutes = require('./routes/answers');

//middleware de body-parser

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(express.json({limit:'50mb'}));


app.use(express.static(__dirname + "/../examples"))
app.use(express.static(__dirname + "/../../front"))


app.use(express.json({limit:'50mb'}));
app.use("public/upload",express.static(__dirname + "/../../public/upload"));



//Rutas Base
app.use('/api',userRoutes);//se declaran todas las rutas como api
app.use('/api',triviaRoutes);//se declaran todas las rutas como api
app.use('/api',Trivia_TokensRoutes);//se declaran todas las rutas como api
app.use('/api',answersRoutes);//se declaran todas las rutas como api

module.exports = app;