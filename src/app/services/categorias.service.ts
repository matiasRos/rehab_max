import { Injectable } from '@angular/core';
import {Servers} from '../config/api';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {handleError} from '../util/error-handler';
@Injectable({
  providedIn: 'root'
})
export class CategoriasServices {

  private url = Servers.RehabMax.baseUrl + '/categoria';

  constructor(private http: HttpClient) { }
 
  listarCategorias(): Observable<any> { 
    return this.http.get<any[]>(this.url  )
      .pipe(
        catchError(handleError('codigoMensaje', {}))
      );
  }

  crearCategoria(data): Observable<any> { 
    var body = {
      "descripcion":data.descripcion
    }
    return this.http.post<any[]>(this.url,body)
      .pipe(
        catchError(handleError('codigoMensaje', {}))
      );
  }

}
