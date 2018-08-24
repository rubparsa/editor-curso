import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Estudio } from '../model/estudio';

@Injectable()
export class EstudioService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    getEstudios(token, tipoEstudioId = null){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers:headers});

        if(tipoEstudioId == null){
            return this._http.get(this.url+'estudios/', options)
                        .map(res => res.json());
        }
        else{
            return this._http.get(this.url+'estudios/'+tipoEstudioId, options)
                         .map(res => res.json());
        }

    }
}