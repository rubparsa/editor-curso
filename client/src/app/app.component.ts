import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Routes, RouterModule } from '@angular/router';

import { UsuarioService } from './services/usuario.service';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UsuarioService]
})
export class AppComponent implements OnInit {
  public titulo: string;
  public usuario: Usuario;
  public usuarioRegistrado: Usuario;
  public identidad;
  public token;
  public errorMessage;
  public alertRegister;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService
  ){
    this.titulo = 'UNED - Gestor de contenidos';
    this.usuario = new Usuario('', '', '', '', '', '', '', '');
    this.usuarioRegistrado = new Usuario('', '', '', '', '', '', '', '');
  }

  ngOnInit(){
    this.identidad = this._usuarioService.getIdentidad();
    this.token = this._usuarioService.getToken();
  }

  public onSubmit(){

    //Conseguir los datos del usuario identificado
    this._usuarioService.login(this.usuario).subscribe(
      response => {
        let identidad = response.usuario;
        this.identidad = identidad;

        if(!this.identidad._id){
          alert("El usuario no está correctamente identificado");
        }
        else{
          // Crear elemento en el localstorage para tener al usuario en sesión
          localStorage.setItem('identidad', JSON.stringify(identidad));
          // Conseguir el token para enviárselo a cada petición http
          this._usuarioService.login(this.usuario, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
      
              if(this.token.length <= 0){
                alert("El token no se ha generado correctamente");
              }
              else{
                // Crear elemento en el localstorage para tener al usuario en sesión
                localStorage.setItem('token', token);
                this.usuario = new Usuario('','','','','','','', '');
              }
            },
            error => {
              var errorMessage = <any>error;
      
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(error);
              }
            });
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }

  logout(){
    localStorage.removeItem('identidad');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identidad = null;
    this.token = null;
    this._router.navigate(['/']);
  }

  onSubmitRegister(){

    this._usuarioService.registro(this.usuarioRegistrado).subscribe(
      response => {
        let usuario = response.usuario;
        this.usuarioRegistrado = usuario;

        if(!usuario._id){
          this.alertRegister = 'Error al registrarse';
        }
        else{
          this.alertRegister = 'El registro se ha realizado correctamente, identifíquese con '+this.usuarioRegistrado.email;
          this.usuarioRegistrado = new Usuario('','','','','','','', '');
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);
        }
      }
    );
  }

}
