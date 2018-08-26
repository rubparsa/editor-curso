import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { AsigProfesor } from '../model/asigProfesor';

@Injectable()
export class AsigProfesorService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    getAsignaturasProfesor(token, profesorId){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers:headers});
        
        return this._http.get(this.url+'asigProfesor/'+profesorId, options)
                         .map(res => res.json());
    }
}