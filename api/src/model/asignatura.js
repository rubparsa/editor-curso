'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsignaturaSchema = Schema({
        codigo: Number,
        nombre: String,
        texto: String,
        etiquetas: Array,
        tipoEstudio: { type: Schema.ObjectId, ref: 'TipoEstudio'},
        estudio: { type: Schema.ObjectId, ref: 'Estudio'},
        anyoCurso: Number,
        creditos: Number,
        curso: Number,
        semestre: Number,
        duracion: String
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);