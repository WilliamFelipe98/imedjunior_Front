import { Injectable } from '@angular/core';
import { Http, RequestOptions, } from '@angular/http';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Options } from 'selenium-webdriver/safari';

@Injectable()
export class ContatosService {
    private url: string = `http://localhost:8000/contato/`;
    constructor(private http: Http) {
    }
    errorHandler(error: any): void {
        console.log(error)
    }
    save(contato: any): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Content-Type', 'application/json');
        return this.http
            .post(this.url, JSON.stringify(contato), { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    update(id: number, contato: any): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + id + "/",JSON.stringify(contato), { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    getList(): Observable<any> {
        var cabecalho = new Headers();
        //console.log(sessionStorage.getItem("token"))
        cabecalho.append('Authorization','JWT '+sessionStorage.getItem("token"));
        const options = new RequestOptions({ headers: cabecalho });
        return this.http
            .get(this.url, options)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    get(id: number): Observable<any> {


        return this.http
            .get(this.url + id + "/")
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    delete(id: number): Observable<any> {
        var cabecalho = new Headers();
        var token = sessionStorage.getItem("token")
        cabecalho.append('Authorization','JWT '+token);
        const options = new RequestOptions({ headers: cabecalho });
        return this.http
            .delete(this.url + id + "/",options)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
}