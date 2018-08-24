'use strict'

var path = require('path');
//var fs = require('fs');
//var mongoosePaginate = require('mongoose-pagination');

var Asignatura = require('../model/asignatura');
var Estudio = require('../model/estudio');

function getAsignaturas(req, res){

    var estudioId = req.params.estudio;

    if(!estudioId){
        //Sacar todas las asignaturas de la BBDD
        var find = Asignatura.find({}).sort('nombre');
    }
    else{
        //Sacar las asignaturas del estudio seleccionado
        var find = Asignatura.find({estudio: estudioId}).sort('nombre');
    }

    find.populate({path: 'estudio'}).exec((err, asignaturas) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!asignaturas){
                res.status(404).send({message: 'No hay asignaturas'});
            }
            else{
                res.status(200).send({asignaturas});
            }
        }
    });
}

module.exports = {
    getAsignaturas
}