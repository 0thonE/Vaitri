'use strict'

const jwt = require('jwt-simple');
const  moment = require('moment');
const secret = 'clave_muy_secreta';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'Request doesn´t have an authentication header.'});
    }
    let token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        let payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'Token has expired.'
            });
        }
        req.user = payload;
    }catch(ex){
        return res.status(404).send({
            message: 'Not valid token.'
        });
    }
    next();
}