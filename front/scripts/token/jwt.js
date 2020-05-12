'use strict'
//https://jwt.io/
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_muy_secreta';

exports.createToken = function(user){
    let payload = {
        //sub: user._id,
        username: user.username,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(1,'days').unix()//expiration date
    };
    return jwt.encode(payload,secret);
}