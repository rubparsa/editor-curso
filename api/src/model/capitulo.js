'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CapituloSchema = Schema({
        nombre: String,
        texto: String,
        etiquetas: String,
        asignatura: String,
        //asignatura: { type: Schema.ObjectId, ref: 'Asignatura'},
        orden: Number
});

module.exports = mongoose.model('Capitulo', CapituloSchema);