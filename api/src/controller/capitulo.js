'use strict'

var path = require('path');
//var fs = require('fs');
//var mongoosePaginate = require('mongoose-pagination');

var Capitulo = require('../model/capitulo');

/*
function pruebas(req, res){
    
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios del api rest con Node y Mongo'
    });
    
}
*/

function getCapitulos(req, res){

    //var find = Capitulo.find({});

    res.status(200).send(Capitulo.find());

    /*
    var artistId = req.params.artist;

    if(!artistId){
        //Sacar todos los álbums de la BBDD
        var find = Album.find({}).sort('title');
    }
    else{
        //Sacar los álbums del artista seleccionado
        var find = Album.find({artist: artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err, albums) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!albums){
                res.status(404).send({message: 'No hay álbums'});
            }
            else{
                res.status(200).send({albums});
            }
        }
    });*/
}

function addCapitulo(req, res){
    
    var capitulo = new Capitulo();

    console.log(req.body);

    var params = req.body;
    capitulo.nombre = 'nombre';
    capitulo.texto = params.texto;
    capitulo.etiquetas = params.etiquetas;
    capitulo.asignatura = 'null';
    capitulo.orden = 1;

    capitulo.save((err, capituloStored) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(!capituloStored){
                res.status(404).send({message: 'Capítulo no guardado'});
            }
            else{
                res.status(200).send({capitulo: capituloStored});
            }
        }
    });
    
}
 
module.exports = {
    getCapitulos,
    addCapitulo
}