'use strict'

var path = require('path');

var Capitulo = require('../model/capitulo');
var Asignatura = require('../model/asignatura');

function getCapitulos(req, res){

    var asignaturaId = req.params.asignatura;

    if(!asignaturaId){
        //Sacar todos los capitulos de la BBDD
        var find = Capitulo.find({});
    }
    else{
        //Sacar los capitulos de la asignatura seleccionada
        var find = Capitulo.find({asignatura: asignaturaId});
    }

    find.exec((err, capitulos) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }
        else{
            if(!capitulos){
                res.status(404).send({message: 'No hay capítulos'});
            }
            else{
                return res.status(200).send({capitulos});
            }
        }
    });
}

function addCapitulo(req, res){
    var capitulo = new Capitulo();
    var params = req.body;
    capitulo.title = params.title;
    capitulo.texto = params.texto;
    capitulo.etiquetas = params.etiquetas;
    capitulo.asignatura = params.asignatura;
    capitulo.parent = params.parent;
    capitulo.children = [];
    capitulo.key = 1;

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

function updateCapitulo(req, res){
    var capituloId = req.params.id;
    var update = req.body;

    Capitulo.findByIdAndUpdate(capituloId, update, (err, capituloUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(!capituloUpdated){
                res.status(404).send({message: 'No se ha actualizado el capítulo'});
            }
            else{
                res.status(200).send({capitulo: capituloUpdated});
            }
        }
    });
}

function deleteCapitulo(req, res){
    var capituloId = req.params.id;

    Capitulo.findByIdAndRemove(capituloId, (err, capituloRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el capítulo'});
        }
        else{
            if(!capituloRemoved){
                res.status(404).send({message: 'El capítulo no ha sido eliminado'});
            }
            else{

                Capitulo.update({parent: capituloRemoved._id}, {parent: ""}, {'multi': true}, (err,contenidoHijoUpdated) => {
                    if(err){
                        res.status(500).send({message: 'Error al actualizar el/los hijo/s'});
                    }
                    else{
                        if(!contenidoHijoUpdated){
                            res.status(404).send({message: 'El/Los hijo/s no ha/n sido actualizado/s'});
                        }
                        else{
                            res.status(200).send({capitulo: capituloRemoved});
                        }
                    }
                });
            }
        }
    });
}

function deleteCapituloeHijos(req, res){
    var capituloId = req.params.id;

    Capitulo.findByIdAndRemove(capituloId, (err, capituloRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el capítulo'});
        }
        else{
            if(!capituloRemoved){
                res.status(404).send({message: 'El capítulo no ha sido eliminado'});
            }
            else{

            Capitulo.find({parent: capituloRemoved._id}).remove((err, contenidoHijoRemoved) => {
                if(err){
                    res.status(500).send({message: 'Error al eliminar el/los hijo/s'});
                }
                else{
                    if(!contenidoHijoRemoved){
                        res.status(404).send({message: 'El/Los hijo/s no ha/n sido eliminado/s'});
                    }
                    else{
                        res.status(200).send({capitulo: capituloRemoved});
                    }
                }
            }); 
            }
        }   
    });
}

function deleteHijos(req, res){
    var ObjectId = require('mongoose').Types.ObjectId;
    var capituloId = req.params.id; 

    Capitulo.find({parent: new ObjectId(capituloId)}).remove((err, hijosRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error al eliminar el/los hijo/s'});
        }
        else{
            if(!hijosRemoved){
                res.status(404).send({message: 'El/Los hijo/s no ha/n sido eliminado/s'});
            }
            else{
                res.status(200).send({capitulo: hijosRemoved});
            }
        }
    }); 
}

function addEtiqueta(req, res){
    var capituloId = req.params.id;
    var nuevaEtiqueta = req.body.etiqueta;

    Capitulo.findByIdAndUpdate(capituloId, {$push: {etiquetas: nuevaEtiqueta}}, {new: true}, (err, capituloUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al añadir la etiqueta'});
        }
        else{
            if(!capituloUpdated){
                res.status(404).send({message: 'No se ha añadido la etiqueta'});
            }
            else{
                res.status(200).send({capitulo: capituloUpdated});
            }
        }
    });
}

module.exports = {
    getCapitulos,
    addCapitulo,
    updateCapitulo,
    deleteCapitulo,
    deleteCapituloeHijos,
    deleteHijos,
    addEtiqueta
}