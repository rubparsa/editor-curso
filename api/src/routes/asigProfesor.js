'use strict'

var express = require('express');
var AsigProfesorController = require('../controller/asigProfesor.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users' });

//api.get('/probando', CapituloController.pruebas);
api.get('/asigProfesor/:profesorId', md_auth.ensureAuth, AsigProfesorController.getAsignaturasProfesor);
//api.post('/capitulo', CapituloController.addCapitulo);
//api.put('/capitulo/:id', CapituloController.updateCapitulo);
//api.post('/login', UserController.loginUser);
//api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
//api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
//api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;