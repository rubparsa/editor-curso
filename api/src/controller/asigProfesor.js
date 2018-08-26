'use strict'

var path = require('path');
//var fs = require('fs');
//var mongoosePaginate = require('mongoose-pagination');

var AsigProfesor = require('../model/asigProfesor');
var Asignatura = require('../model/asignatura');
var Estudio = require('../model/estudio');
var tipoEstudio = require('../model/tipoEstudio');

function getAsignaturasProfesor(req, res){

    var ObjectId = require('mongoose').Types.ObjectId; 
    var profesorId = req.params.profesorId;

    var find = AsigProfesor.find({profesor: new ObjectId(profesorId)});

    find.populate({path: 'asignatura',
    populate: [{path: 'estudio', model: 'Estudio'},
              {path: 'tipoEstudio', model: 'tipoEstudio', options: {sort: 'nombre'}}]})
    .exec((err, asignaturasProfesor) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!asignaturasProfesor){
                res.status(404).send({message: 'El profesor no existe o no tiene asignaturas asignadas'});
            }
            else{
                res.status(200).send({asignaturasProfesor});
            }
        }
    });
}

module.exports = {
    getAsignaturasProfesor
}