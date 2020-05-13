'use strict'
const mongoose = require('mongoose');
let db = require('./db/dbUrl.json');
let app = require('./app');
/*
let user = 'dbUser'
let password = 'testUser'
let dbName = 'Vaitri'
const dbUrl = `mongodb+srv://${user}:${password}@cluster0-mpwi9.mongodb.net/${dbName}?retryWrites=true&w=majority`;
            //mongodb+srv://dbUser:testUser@cluster0-mpwi9.mongodb.net/Vaitri?retryWrites=true&w=majority
*/

//let app = require('./app');
let PORT = process.env.PORT || 3000;//VAriable de entorno del SO || 3000

mongoose.connect(db.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true, //atributo es unico
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("\n\n====== Conection with DB established ======\n");
        
        app.listen(PORT,()=>{
            console.log("**** Local host in port: " + PORT + "****\n")
        });
        
    })
    .catch(err => console.log(err));

    module.exports = mongoose;