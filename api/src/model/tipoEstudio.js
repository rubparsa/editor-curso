'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoEstudioSchema = Schema({
        codigo: Number,
        nombre: String
},
{
        collection: 'tipoEstudio'
});

module.exports = mongoose.model('tipoEstudio', tipoEstudioSchema, 'tipoEstudio');