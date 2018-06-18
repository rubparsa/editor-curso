import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { CapituloService } from './services/capitulo.service';
//import { Capitulo } from './model/capitulo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  public titulo: string;
  //public capitulo: Capitulo;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    //private _capituloService: CapituloService
  ){
    this.titulo = 'Gestor de contenido';
    //this.capitulo = new Capitulo('','','','', 1);
  }

  ngOnInit(){
    
  }

  /*
  public onSubmit(){

    this._route.params.forEach((params: Params) => {

      console.log(params);

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
  */
}
