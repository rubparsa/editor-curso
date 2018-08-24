import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Asignatura } from '../model/asignatura';

@Injectable()
export class AsignaturaService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    getAsignaturas(token, estudioId = null){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers:headers});

        if(estudioId == null){
            return this._http.get(this.url+'asignaturas/', options)
                         .map(res => res.json());
        }
        else{
            return this._http.get(this.url+'asignaturas/'+estudioId, options)
            .map(res => res.json());
        }
    }
}