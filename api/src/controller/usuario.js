'use strict'
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../model/usuario');
var jwt = require('../services/jwt');

function guardarUsuario(req, res){
    var usuario = new Usuario();

    var params = req.body;

    usuario.nombre = params.nombre;
    usuario.apellidos = params.apellidos;
    usuario.email = params.email;
    usuario.departamento = '';
    usuario.facultad = ''
    usuario.rol = '';

    if(params.password){
        // Encriptar contraseña
        bcrypt.hash(params.password, null, null, function(err, hash){
            usuario.password = hash;
            if(usuario.nombre != null && usuario.apellidos != null && usuario.email != null){
                // Guardar el usuario
                usuario.save((err, usuarioStored) => {
                    if(err){
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }
                    else {
                        if(!usuarioStored){
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }
                        else {
                            res.status(200).send({usuario: usuarioStored});
                        }
                    }
                })
            }
            else {
                res.status(200).send({message: 'Rellena todos los campos'});
            }
        });
    }
    else {
        res.status(200).send({message: 'Introduce la contraseña'});
    }
}

function loginUsuario(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    Usuario.findOne({email: email.toLowerCase()}, (err, usuario) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!usuario){
                res.status(404).send({message: 'El usuario no existe'});
            }
            else{
                // Comprobar la contraseña
                bcrypt.compare(password, usuario.password, function(err, check){
                    if(check){
                        //devolver los datos del usuario logueado
                        if(params.gethash){
                            // devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(usuario)
                            });
                        }
                        else{
                            res.status(200).send({usuario});
                        }
                    }
                    else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse'});
                    }
                })
            }
        }
    })
}

module.exports = {
    guardarUsuario,
    loginUsuario
};