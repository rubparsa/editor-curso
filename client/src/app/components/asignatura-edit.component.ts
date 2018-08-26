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
    
    //console.log(this.asignatura);

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
                console.log(this.asignatura);
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
    /*
    this._route.params.forEach((params: Params) => {


      let node_prov = $("#tree").fancytree("getActiveNode");
      let nombre_prov = node_prov.title;
      this.capitulo.title = nombre_prov;
      this.capitulo.asignatura = this.asignatura_id;
      this.capitulo._id = node_prov.data._id;
      if(this.capitulo.etiquetas){
        this.capitulo.etiquetas.push(etiqueta);
      }
      else{
        this.capitulo.etiquetas = etiqueta;
      }

      if(node_prov.getLevel() == 2){
        this.capitulo.parent = node_prov.getParent().data._id;
      }
      else{
        this.capitulo.parent = '';
      }
      console.log(this.capitulo);
      
      if(this.capitulo._id){

        this._capituloService.updateCapitulo(this.capitulo._id, this.capitulo).subscribe(
          response => {
            if (!response.capitulo) {
              this.alertMessage = 'Error en el servidor';
            }
            else {
              this.alertMessage = 'El capítulo se ha editado correctamente';
              this.capitulo = response.capitulo;
              reloadFT();
              //this._router.navigate(['/editar-album', response.album._id]);
            }
          },
          error => {

          }
        );
      } // end if

      else{
        
        this._capituloService.addCapitulo(this.capitulo).subscribe(
          response => {
            if (!response.capitulo) {
              this.alertMessage = 'Error en el servidor';
            }
            else {
              this.alertMessage = 'El capítulo se ha creado correctamente';
              this.capitulo = response.capitulo;
              reloadFT();
              //this._router.navigate(['/editar-album', response.album._id]);
            }
          },
          error => {

          }
        );
      } //end else
    });
    */
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