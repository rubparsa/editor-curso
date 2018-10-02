'use strict'

var express = require('express');
var tipoEstudioController = require('../controller/tipoEstudio.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/tipoEstudio/', md_auth.ensureAuth, tipoEstudioController.getTipoEstudio);

module.exports = api;