const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: false
    },
    lastname:{
        type: String,
        required: false
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    trivia:{
        type: Array,
        required: false
    },
    acerca:{
        type: String,
        required: false
    }
})

let User = mongoose.model('users', userSchema);
module.exports = User;

/*
function getUsers(cbOk, cbErr){
    User.find({}, (err,docs)=>{
        if(docs){
            console.log(docs);
            cbOk(docs)
        }
        if(err){
            console.log(err);
            cbErr(err)
        }
    })
} 

async function getUsersAsync(){//quien la mande a llamar tambien tiene que ser asincrona
    let docs = [];
    try{
        docs = await User.find({});
    console.log(docs);
    }catch(error){
        console.log('error', error);
    }

    return docs;
}

function crearUsuario(newUser){
    let userMongo = User(newUser);
    userMongo.save()
            .then((resp)=> console.log(resp))
            .catch((err)=>console.log(err))
            //alert("Usuario creado exitosamente.");
}

/*let newUser = {
    firstname: 'test3',
    lastname: 'test3',
    username: 'test3',
    email: 'test3@test',
    password: 'test3'
}

//crearUsuario(newUser);
//getUsersAsync();

User.getUsersAsync = getUsersAsync;
User.getUsers = getUsers;
User.createUsers = crearUsuario;
*/
