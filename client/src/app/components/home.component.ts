import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Asignatura } from '../model/asignatura';
import { AsignaturaService } from '../services/asignatura.service';
import { GLOBAL } from '../services/global';
import { UsuarioService } from '../services/usuario.service';
import { tipoEstudio } from '../model/tipoEstudio';
import { tipoEstudioService } from '../services/tipoEstudio.service';
import { Estudio } from '../model/estudio';
import { EstudioService } from '../services/estudio.service';

@Component ({
    selector: 'home',
    templateUrl: '../view/home.html',
    providers: [AsignaturaService, UsuarioService, tipoEstudioService, EstudioService]
})

export class HomeComponent implements OnInit{
    public titulo: string;
    public arrayTipoEstudio: tipoEstudio[];
    public arrayEstudios: Estudio[];
    public arrayAsignaturas: Asignatura[];
    public url: string;
    public identidad;
    public token;
    public alertMessage;
    public tipoEstudioSelected;
    public estudioSelected;
    public asignaturaSelected;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _asignaturaService: AsignaturaService,
        private _usuarioService: UsuarioService,
        private _tipoEstudioService: tipoEstudioService,
        private _estudioService: EstudioService
    ){
        this.titulo = '';
        this.identidad = this._usuarioService.getIdentidad();
        this.token = this._usuarioService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){

        this.getTipoEstudio();
        //this.getEstudios();
        //this.getAsignaturas();

    }

    logout(){
        localStorage.removeItem('identidad');
        localStorage.removeItem('token');
        localStorage.clear();
        this.identidad = null;
        this.token = null;
        this._router.navigate(['/']);
    }

    getTipoEstudio(){

        this._tipoEstudioService.getTipoEstudio(this.token).subscribe(
            response => {
                if(!response.tipoEstudio){
                    this.arrayTipoEstudio = null;
                }
                else{
                    this.arrayTipoEstudio = response.tipoEstudio;
                }
            },
            error => {
                var errorMessage = <any>error;

                if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                }
            }
        );
    }

    getEstudios(){

        let id = this.tipoEstudioSelected;

        this._estudioService.getEstudios(this.token, id).subscribe(
            response => {
                if(!response.estudios){
                    this.arrayEstudios = null;
                }
                else{
                    this.arrayEstudios = response.estudios;
                }
            },
            error => {
                var errorMessage = <any>error;

                if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                }
            }
        );
    }

    getAsignaturas(){

        let id = this.estudioSelected;

        this._asignaturaService.getAsignaturas(this.token, id).subscribe(
            response => {
                if(!response.asignaturas){
                    this.arrayAsignaturas = null;
                }
                else{
                    this.arrayAsignaturas = response.asignaturas;
                }
            },
            error => {
                var errorMessage = <any>error;

                if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                }
            }
        );
    }

    updateTipoEstudioSelected($event){
        this.tipoEstudioSelected = $event;
        this.getEstudios();
    }

    updateEstudioSelected($event){
        this.estudioSelected = $event;
        this.getAsignaturas();
    }

}