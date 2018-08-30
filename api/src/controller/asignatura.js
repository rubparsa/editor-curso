'use strict'

var path = require('path');
//var fs = require('fs');
//var mongoosePaginate = require('mongoose-pagination');

var Asignatura = require('../model/asignatura');
var Estudio = require('../model/estudio');

function getAsignatura(req, res){
    
    var asignaturaId = req.params.id;

    Asignatura.findOne({codigo: asignaturaId}).exec((err, asignatura) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!asignatura){
                res.status(404).send({message: 'Asignatura sin nombre o ID de asignatura no encontrado'});
            }
            else{
                res.status(200).send({asignatura});
            }
        }
    });
}

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

function updateAsignatura(req, res){
    var asignaturaId = req.params.id;
    var update = req.body;
    console.log(update);

    Asignatura.findByIdAndUpdate(asignaturaId, update, {new: true}, (err, asignaturaUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(!asignaturaUpdated){
                res.status(404).send({message: 'No se ha actualizado el contenido de la asignatura'});
            }
            else{
                res.status(200).send({asignatura: asignaturaUpdated});
            }
        }
    });
}

function addEtiqueta(req, res){
    var asignaturaId = req.params.id;
    var nuevaEtiqueta = req.body.etiqueta;

    Asignatura.findByIdAndUpdate(asignaturaId, {$push: {etiquetas: nuevaEtiqueta}}, {new: true}, (err, asignaturaUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(!asignaturaUpdated){
                res.status(404).send({message: 'No se ha añadido la etiqueta'});
            }
            else{
                res.status(200).send({asignatura: asignaturaUpdated});
            }
        }
    });
}

module.exports = {
    getAsignatura,
    getAsignaturas,
    updateAsignatura,
    addEtiqueta
}