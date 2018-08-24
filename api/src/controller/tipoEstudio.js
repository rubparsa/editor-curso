'use strict'

var path = require('path');
//var fs = require('fs');
//var mongoosePaginate = require('mongoose-pagination');

var TipoEstudio = require('../model/tipoEstudio');

function getTipoEstudio(req, res){

    TipoEstudio.find({}).exec((err, tipoEstudio) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!tipoEstudio){
                res.status(404).send({message: 'No hay tipos de estudio'});
            }
            else{
                return res.status(200).send({ tipoEstudio });
            }
        }
    });
}

module.exports = {
    getTipoEstudio
}