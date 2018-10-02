'use strict'

var express = require('express');
var AsigProfesorController = require('../controller/asigProfesor.js');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/asigProfesor/:profesorId', md_auth.ensureAuth, AsigProfesorController.getAsignaturasProfesor);

module.exports = api;