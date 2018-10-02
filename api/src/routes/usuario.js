'use strict'

var express = require('express');
var UsuarioController = require('../controller/usuario.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/registro', UsuarioController.guardarUsuario);
api.post('/login', UsuarioController.loginUsuario);

module.exports = api;