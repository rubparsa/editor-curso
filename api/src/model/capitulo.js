'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CapituloSchema = Schema({
        title: String,
        texto: String,
        etiquetas: Array,
        asignatura: { type: Number, ref: 'Asignatura'},
        parent: { type: String, ref: 'Capitulo'},
        children: Array,
        key: Number
});

module.exports = mongoose.model('Capitulo', CapituloSchema);