import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Capitulo } from '../model/capitulo';

@Injectable()
export class CapituloService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    addCapitulo(contenido: Capitulo){
        let params = JSON.stringify(contenido);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.post(this.url+'capitulo', params, {headers: headers})
                         .map(res => res.json());
    }

    updateCapitulo(id:string, contenido: Capitulo){
        let params = JSON.stringify(contenido);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.put(this.url+'capitulo/'+id, params, {headers: headers})
                         .map(res => res.json());
    }

    deleteCapitulo(id: string){
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({headers:headers});

        return this._http.delete(this.url+'capitulo/'+id, options)
                         .map(res => res.json());
    }

    addEtiqueta(token, id:string, etiqueta: string){
        //let params = etiqueta;
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        console.log(etiqueta);

        return this._http.put(this.url+'etiqueta/'+id, {etiqueta: etiqueta}, {headers:headers})
                         .map(res => res.json());
    }
}