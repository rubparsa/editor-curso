'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsigProfesorSchema = Schema({
        asignatura: { type: Schema.ObjectId, ref: 'Asignatura'},
        usuario: { type: Schema.ObjectId, ref: 'Usuario'},
        departamento: String,
        facultad: String,
        curso: Number
});

module.exports = mongoose.model('AsigProfesor', AsigProfesorSchema, 'asigProfesor');