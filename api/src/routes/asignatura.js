'use strict'

var express = require('express');
var AsignaturaController = require('../controller/asignatura.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users' });

//api.get('/probando', CapituloController.pruebas);
api.get('/asignatura/:id', md_auth.ensureAuth, AsignaturaController.getAsignatura);
api.put('/asignatura/:id', md_auth.ensureAuth, AsignaturaController.updateAsignatura);
api.get('/asignaturas/:estudio?', md_auth.ensureAuth, AsignaturaController.getAsignaturas);
api.put('/etiquetaAsignatura/:id', md_auth.ensureAuth, AsignaturaController.addEtiqueta);
//api.get('/asignaturasProfesor/:profesorId', md_auth.ensureAuth, AsignaturaController.getAsignaturasProfesor);
//api.post('/capitulo', CapituloController.addCapitulo);
//api.put('/capitulo/:id', CapituloController.updateCapitulo);
//api.post('/login', UserController.loginUser);
//api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
//api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
//api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;