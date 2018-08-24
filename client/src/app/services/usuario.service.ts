import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UsuarioService{
    public identidad;
    public token;
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    
    login(usuarioLogin, gethash = null){
        if(gethash != null){
            usuarioLogin.gethash = gethash;
        }
        let json = JSON.stringify(usuarioLogin);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.post(this.url+'login', params, {headers: headers})
                         .map(res => res.json());
    }

    registro(usuarioRegistro){
        let params = JSON.stringify(usuarioRegistro);
        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.post(this.url+'registro', params, {headers: headers})
                         .map(res => res.json());
    }

    actualizarUsuario(usuarioActualizar){
        let params = JSON.stringify(usuarioActualizar);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': this.getToken()
        });

        return this._http.put(this.url+'actualizar-usuario/'+usuarioActualizar._id,
            params, {headers: headers})
                         .map(res => res.json());
    }

    getIdentidad(){
        let identidad = JSON.parse(localStorage.getItem('identidad'));

        if(identidad != "undefined"){
            this.identidad = identidad;
        }
        else{
            this.identidad = null;
        }

        return this.identidad;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }
        else{
            this.token = null;
        }

        return this.token;
    }
}