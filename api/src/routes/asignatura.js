'use strict'

var express = require('express');
var AsignaturaController = require('../controller/asignatura.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated.js');

api.get('/asignatura/:id', md_auth.ensureAuth, AsignaturaController.getAsignatura);
api.put('/asignatura/:id', md_auth.ensureAuth, AsignaturaController.updateAsignatura);
api.get('/asignaturas/:estudio?', md_auth.ensureAuth, AsignaturaController.getAsignaturas);
api.put('/etiquetaAsignatura/:id', md_auth.ensureAuth, AsignaturaController.addEtiqueta);

module.exports = api;