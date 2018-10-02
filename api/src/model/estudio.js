'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstudioSchema = Schema({
        codigo: Number,
        nombre: String,
        facultad: String,
        area: String,
        tipoEstudio: { type: Schema.ObjectId, ref: 'TipoEstudio'},
});

module.exports = mongoose.model('Estudio', EstudioSchema);