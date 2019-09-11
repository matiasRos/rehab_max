import { Injectable } from "@angular/core";
import { Servers } from "../config/api";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { handleError } from "../util/error-handler";

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private url = Servers.RehabMax.baseUrl + "/presentacionProducto";
  constructor(private http: HttpClient) { }
  
  listarServicios(urlParams): Observable<any> {
    console.log(this.url+urlParams)
    return this.http
      .get<any[]>(
        this.url + urlParams
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  filtrarServicios(urlFiltro): Observable<any> {
    return this.http
      .get<any[]>(this.url + urlFiltro)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  crearServicio(data): Observable<any> {
    var body = {

    };
    return this.http
      .post<any[]>(this.url, body)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
}
