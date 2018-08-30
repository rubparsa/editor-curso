'use strict'

var express = require('express');
var CapituloController = require('../controller/capitulo.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users' });

//api.get('/probando', CapituloController.pruebas);
api.get('/capitulos/:asignatura?', md_auth.ensureAuth, CapituloController.getCapitulos);
//api.get('capitulos/:asignatura', CapituloController.getCapitulosAsignatura);
api.post('/capitulo', md_auth.ensureAuth, CapituloController.addCapitulo);
api.put('/capitulo/:id', md_auth.ensureAuth, CapituloController.updateCapitulo);
api.delete('/capitulo/:id', md_auth.ensureAuth, CapituloController.deleteCapitulo);
api.delete('/capituloeHijos/:id', md_auth.ensureAuth, CapituloController.deleteCapituloeHijos);
api.delete('/contenidoHijos/:id', md_auth.ensureAuth, CapituloController.deleteHijos);
api.put('/etiqueta/:id', md_auth.ensureAuth, CapituloController.addEtiqueta);
//api.post('/login', UserController.loginUser);
//api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
//api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
//api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;