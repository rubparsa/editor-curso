'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
        nombre: String,
        apellidos: String,
        email: String,
        password: String,
        departamento: String,
        //departamento: { type: Schema.ObjectId, ref: 'Departamento' },
        facultad: String,
        //facultad: { type: Schema.ObjectId, ref: 'Facultad' },
        rol: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);