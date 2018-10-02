'use strict'

var express = require('express');
var CapituloController = require('../controller/capitulo.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/capitulos/:asignatura?', md_auth.ensureAuth, CapituloController.getCapitulos);
api.post('/capitulo', md_auth.ensureAuth, CapituloController.addCapitulo);
api.put('/capitulo/:id', md_auth.ensureAuth, CapituloController.updateCapitulo);
api.delete('/capitulo/:id', md_auth.ensureAuth, CapituloController.deleteCapitulo);
api.delete('/capituloeHijos/:id', md_auth.ensureAuth, CapituloController.deleteCapituloeHijos);
api.delete('/contenidoHijos/:id', md_auth.ensureAuth, CapituloController.deleteHijos);
api.put('/etiqueta/:id', md_auth.ensureAuth, CapituloController.addEtiqueta);

module.exports = api;