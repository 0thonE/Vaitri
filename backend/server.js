'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const randomize = require('randomatic');//https://www.npmjs.com/package/randomatic
app.use(express.json())

let users = JSON.parse(fs.readFileSync('users.json'))

//Front-end

//app.use(express.static('public'));
//app.use(express.static('files'));
//No pude hacer que funcionara con este .js, me seguia usando el de la practica 3


//app.get('/',(req,res)=> res.send("Users app practica 4"))
//app.listen(port, ()=>{console.log('ejecutando en el puerto ' + port);})

function autenticar (req, res, next) {//Middleware
    let auth = req.get('x-auth-user')
    console.log(req.get('x-auth-user'))
    if (auth) {
        let idUsuario = auth.split('-')[1]
        let flagError = 1
        users.forEach(e => {
            if (parseInt(e.id) === parseInt(idUsuario)) {
                flagError = 0
            }
        })
        if (flagError === 0) {
            req.id = idUsuario
            next()
        } else {
            res.send("Id no existe")
            return
        }
    } else {
        res.send("usuario no autenticado")//error 401
        return
    }
}

app.get('/', (req,res)=>{
    res.send(users)
})

let body

app.route('/user')
    .get(autenticar, (req,res)=>{
        console.log(users)
        let auxUsers = users.slice()
        auxUsers.map(elem =>{ //Quitar
            let resultado = {
                password: elem.password,
                sexo: elem.sexo,
                fecha: elem.fecha
            }
        })

        //Busquedas
        let paramNombre = req.query.nombre
        let paramApellido = req.query.apellido

        if (paramNombre) {
            auxUsers = auxUsers.filter((elem) => {
                return elem.nombre.toUpperCase().includes(paramNombre.toUpperCase())
            })
        }
        if (paramApellido) {
            auxUsers = auxUsers.filter((elem) => {
                return elem.apellido.toUpperCase().includes(paramApellido.toUpperCase())
            })
        }

        if(req.query.page) { //paginado
            console.log("Paginacion disponible")
            let page = req.query.page;
            let defaultPages = 5;
            if(req.query.limit != undefined){
                defaultPages = req.query.limit;
            }

            auxUsers = auxUsers.filter((elem) => {
                return elem.id >= (defaultPages*(page-1)) && elem.id < (defaultPages*page)
            })
        }

        res.send(auxUsers)
    })
    .post((req,res)=>{
        body = req.body;
        let requireData = ['nombre', 'apellido', 'correo', 'password', 'sexo', 'fecha'];
        let error = "";
        let flagError = 0
        let urlUser = 'https://randomuser.me/api/portraits/'
        let url = 'https://randomuser.me/api/portraits/women/0.jpg'
        
        requireData.forEach( elem => { //bad request
            error = 'Missing data: '
            if (typeof body[elem] === 'undefined') {
                error += elem + ',';
                flagError = 1;
            }
        })
        if (flagError === 1) {
            res.status(400).send(error)
            return
        }
        
        users.forEach(elem => { //see if user already exists
            error = 'User already exist : '
            if (elem.nombre === body.nombre && elem.apellido === body.apellido) {
                error += elem.nombre + ' ' + elem.apellido
                flagError = 1
            }
        })
        if (flagError === 1) {
            res.status(400).send(error)
            return
        }
        
        if (typeof body.url === 'undefined') { //see if body sent url, else create one
            body.id = (users[users.length - 1].id + 1)
            body.url = urlUser + body.sexo + '/' + body.id + '.jpg'
            console.log(body.url)
        }
        
        users.push(body)
        fs.writeFile('users.json', JSON.stringify(users), function (err) {
            if (err) throw err;
            console.log('User saved');
          });
        res.status(201).send("Good request")
        return
    })

app.route('/api/login')
    .post((req,res)=>{ //bad request
    body = req.body
    let requireData = ['correo', 'password']
    let error = ""
    let flagError = 0
    let token

    requireData.forEach( item => {
        error = 'Missing data: '
        if (typeof body[item] === 'undefined') {
            error += item + ','
            flagError = 1
        }
    })
    if (flagError === 1) {
        res.status(400).send(error)
        return
    }

    flagError = 1
    error = 'Incorrect Login'
    users.forEach(item => { //verify login body and token generation
        if (item.correo === body.correo && item.password === body.password) {
            if (typeof item.token === 'undefined') {
                token = randomize('Aa0','10') + '-' + item.id
                item.token = token
            } else {
                item.token = token
            }
            flagError = 0
        }
    })
    if (flagError === 1) {
        res.status(401).send(error)
        return
    }

    fs.writeFile('users.json', JSON.stringify(users), function (err) {
        if (err) throw err;
        console.log('Login saved');
        });
    res.status(200).send('User token: ' + token)
    return


    })

app.get('/user/:email', (req, res) => {
    let correo = req.params.email
    let user = users.filter((item) => {
        return item.correo === correo
    })
    if(!user){
        res.sendStatus(404)
        return
    }
    console.log(user)
    res.status(200).send(user)
})

app.delete('/user/:email', (req,res)=>{//Delete user

    users.filter(function(value, index){
        return value.correo !== req.body.correo;
    });
    fs.writeFile('users.json', JSON.stringify(users), function (err) {
        if (err) throw err;
    });

    res.send("Usuario borrado")
})

app.listen(port, ()=> console.log('Ejecutando en el puerto ' + port));