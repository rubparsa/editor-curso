import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CapituloService } from '../services/capitulo.service';
import { Capitulo } from '../model/capitulo';

@Component({
  selector: 'capitulo-add',
  templateUrl: '../view/capitulo-add.html',
  providers: [CapituloService]
})
export class CapituloAddComponent implements OnInit {
  public titulo: string;
  public capitulo: Capitulo;
  public alertMessage;
  //@Input() tinymce: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _capituloService: CapituloService
  ){
    this.titulo = 'Gestor de contenido - Añadir nuevo capítulo';
    this.capitulo = new Capitulo('','','','', 1);
  }

  ngOnInit(){
    
  }

  public onSubmit(){

    this._route.params.forEach((params: Params) => {

      let texto_prov = document.getElementById('tinymce').innerHTML;

      this.capitulo.texto = texto_prov;

      this._capituloService.addCapitulo(this.capitulo).subscribe(
        response => {
          if(!response.album){
            this.alertMessage = 'Error en el servidor';
          }
          else{
            this.alertMessage = 'El capítulo se ha creado correctamente';
            this.capitulo = response.capitulo;
            //this._router.navigate(['/editar-album', response.album._id]);
          }
        },
        error => {

        }
      );
    });
  }
}