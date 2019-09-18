import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Servers } from "../config/api";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { handleError } from "../util/error-handler";

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private http: HttpClient) { }

  private url = Servers.RehabMax.baseUrl + '/servicio';

  crearServicio(data): Observable<any> {
    var body = {
      idFichaClinica: {
        idFichaClinica: data.idFichaClinica
      },
      observacion: data.observacion
    };
    return this.http
      .post<any[]>(this.url, body, {
        headers: {
          usuario: 'ana'
        }
      })
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  listarServicios(): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(catchError(handleError("CodigoMensaje", {})));
  }
}
