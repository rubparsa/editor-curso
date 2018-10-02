'use strict'

var path = require('path');
var Estudio = require('../model/estudio');;

function getEstudios(req, res){

    var tipoEstudioId = req.params.tipoEstudio;

    if(!tipoEstudioId){
        //Sacar todos los estudios de la BBDD
        var find = Estudio.find({}).sort('nombre');
    }
    else{
        //Sacar los estudios del tipo de estudio seleccionado
        var find = Estudio.find({tipoEstudio: tipoEstudioId}).sort('nombre');
    }

    find.exec((err, estudios) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!estudios){
                res.status(404).send({message: 'No hay tipos de estudio'});
            }
            else{
                return res.status(200).send({ estudios });
            }
        }
    });
}

module.exports = {
    getEstudios
}