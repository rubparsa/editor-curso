'use strict'

var express = require('express');
var UsuarioController = require('../controller/usuario.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users' });

api.post('/registro', UsuarioController.guardarUsuario);
api.post('/login', UsuarioController.loginUsuario);
//api.put('/actualizar-usuario/:id', md_auth.ensureAuth, UsuarioController.actualizarUsuario);

module.exports = api;