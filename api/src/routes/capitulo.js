'use strict'

var express = require('express');
var CapituloController = require('../controller/capitulo.js');

var api = express.Router();
//var md_auth = require('../middlewares/authenticated');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users' });

//api.get('/probando', CapituloController.pruebas);
api.get('/capitulos', CapituloController.getCapitulos);
api.post('/capitulo', CapituloController.addCapitulo);
//api.put('/capitulo/:id', CapituloController.updateCapitulo);
//api.post('/login', UserController.loginUser);
//api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
//api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
//api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;