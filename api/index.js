'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 4567;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/PrototipoFinal', (err, res) => {
    if(err){
         throw err;   
    }
    else {
        console.log("La conexión a la base de datos está funcionando correctamente...");
    
        app.listen(port, function(){
            console.log("Servidor del api rest de contenido escuchando en http://localhost:" +port)
        })
    }
});
mongoose.set('debug', true);