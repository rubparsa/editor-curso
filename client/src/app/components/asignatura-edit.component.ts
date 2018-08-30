import { Component, OnInit, NgZone} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AsignaturaService } from '../services/asignatura.service';
import { Asignatura } from '../model/asignatura';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'asignatura-edit',
  templateUrl: '../view/asignatura-edit.html',
  providers: [AsignaturaService, UsuarioService]
})
export class AsignaturaEditComponent implements OnInit {
  public titulo: string;
  public asignatura: Asignatura;
  public alertMessage;
  public identidad;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _asignaturaService: AsignaturaService
  ){
    this.asignatura = new Asignatura('','', '', '', [], '', '', 2018, 0, 0, 0, '');
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
    console.log(this.token);
    this.titulo = 'Editar ';
  }

  ngOnInit(){

    // Sacar asignatura de la BBDD
    this.getAsignatura();

  } //fin onInit

  public getAsignatura(){

    let asignatura_id = this._route.snapshot.paramMap.get('asignatura');

    this._asignaturaService.getAsignatura(this.token, asignatura_id).subscribe(
        response => {
            if(!response.asignatura){
                this._router.navigate(['/']);
            }
            else{
                this.asignatura = response.asignatura;
                //console.log(this.asignatura);
            }
        },
        error => {
            var errorMessage = <any>error;

            if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.alertMessage = body.message;
            }
        }
    );

  }

  public onSubmit(etiqueta){
    
    this._route.params.forEach((params: Params) => {

        if(this.asignatura.etiquetas){
            this.asignatura.etiquetas.push(etiqueta);
          }
          else{
            this.asignatura.etiquetas = etiqueta;
          }

        this._asignaturaService.updateAsignatura(this.token, this.asignatura._id, this.asignatura).subscribe(
          response => {
            if (!response.asignatura) {
              this.alertMessage = 'Error en el servidor';
            }
            else {
              this.alertMessage = 'La asignatura se ha editado correctamente';
              this.asignatura = response.asignatura;
            }
          },
          error => {

          }
        );
    });
  } // end onSubmit

    public anyadirEtiqueta(etiqueta) {

        this._asignaturaService.addEtiqueta(this.token, this.asignatura._id, etiqueta).subscribe(
            response => {
                if (!response.asignatura) {
                    this.alertMessage = 'Error en el servidor';
                }
                else {
                    this.alertMessage = 'La etiqueta se ha asociado a la asignatura correctamente';
                    this.asignatura = response.asignatura;
                }
            },
            error => {
                var errorMessage = <any>error;

                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                }
            }
        );
    } // end anyadirEtiqueta

} //end Component