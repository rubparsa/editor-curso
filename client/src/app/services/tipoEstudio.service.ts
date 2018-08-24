import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { tipoEstudio } from '../model/tipoEstudio';

@Injectable()
export class tipoEstudioService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    getTipoEstudio(token){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers:headers});

        return this._http.get(this.url+'tipoEstudio/', options)
                         .map(res => res.json());

    }
}