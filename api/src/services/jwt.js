'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_tfg';

exports.createToken = function(usuario){
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email,
        departamento: usuario.departamento,
        facultad: usuario.facultad,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
};