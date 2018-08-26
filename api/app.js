'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas

var capitulo_routes = require('./src/routes/capitulo');
var asignatura_routes = require('./src/routes/asignatura');
var asigProfesor_routes = require('./src/routes/asigProfesor');
var usuario_routes = require('./src/routes/usuario');
var estudio_routes = require('./src/routes/estudio');
var tipoEstudio_routes = require('./src/routes/tipoEstudio');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(bodyParser.text());
//app.use(bodyParser.raw());

// configurar cabeceras http

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//rutas base

app.use('/api', capitulo_routes);
app.use('/api', asignatura_routes);
app.use('/api', asigProfesor_routes);
app.use('/api', usuario_routes);
app.use('/api', estudio_routes);
app.use('/api', tipoEstudio_routes);

module.exports = app;