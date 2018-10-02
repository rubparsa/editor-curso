'use strict'

var express = require('express');
var EstudioController = require('../controller/estudio.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/estudios/:tipoEstudio?', md_auth.ensureAuth, EstudioController.getEstudios);

module.exports = api;