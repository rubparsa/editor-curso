'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
        nombre: String,
        apellidos: String,
        email: String,
        password: String,
        departamento: String,
        facultad: String,
        rol: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);