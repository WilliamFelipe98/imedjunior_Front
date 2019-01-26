import { Injectable } from '@angular/core';
import { Http, RequestOptions, } from '@angular/http';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class NoticiasService {
    private url: string = `http://localhost:8000/noticia/`;
    constructor(private http: Http) {
    }
    errorHandler(error: any): void {
        console.log(error)
    }

    update(id: number, noticia: any): Observable<any> {
        var cabecalho = new Headers();
        var token = sessionStorage.getItem("token")
        cabecalho.append('Authorization', 'JWT ' + token);
        const options = new RequestOptions({ headers: cabecalho });
        cabecalho.append('Content-Type', 'application/json');

        return this.http
            .put(this.url + id + "/", JSON.stringify(noticia), { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    getList(): Observable<any> {
        var cabecalho = new Headers();
        var token = sessionStorage.getItem("token")
        cabecalho.append('Authorization', 'JWT ' + token);
        const options = new RequestOptions({ headers: cabecalho });
        return this.http
            .get(this.url, options)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))

    }
    get(id: number): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Authorization', 'JWT ' + sessionStorage.getItem("token"));
        var token = sessionStorage.getItem("token")
        cabecalho.append('Authorization', 'JWT ' + token);
        const options = new RequestOptions({ headers: cabecalho });

        return this.http
            .get(this.url + id + "/")
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    delete(id: number): Observable<any> {
        var cabecalho = new Headers();
        var token = sessionStorage.getItem("token")
        cabecalho.append('Authorization', 'JWT ' + token);
        const options = new RequestOptions({ headers: cabecalho });
        return this.http
            .delete(this.url + id + "/", options)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    /*save(noticia: any): Observable<any> {
        var cabecalho = new Headers();
        var token = sessionStorage.getItem("token")
        cabecalho.append('Authorization', 'JWT ' + token);
        cabecalho.append('Content-Type', 'multipart/form-data');
        const options = new RequestOptions({ headers: cabecalho });
        return this.http
            .post(this.url, JSON.stringify(noticia), { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }*/
    save(imagem: File, titulo: string, descricao: string, data: string, autor: string)
        : Observable<any> {
        let formData = new FormData();
        const fileToUpload: File = new File([this.dataURItoBlob(imagem)], 'filename.png');
        formData.append('imagem', fileToUpload);
        formData.append('titulo', titulo);
        formData.append('descricao', descricao);
        formData.append('data', data);
        formData.append('autor', autor);

        return this.http
            .post(this.url + "/noticias", formData)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    dataURItoBlob(dataURI): Blob {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }
}