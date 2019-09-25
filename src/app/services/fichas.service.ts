import { Injectable } from "@angular/core";
import { Servers } from "../config/api";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { handleError } from "../util/error-handler";

@Injectable({
  providedIn: 'root'
})
export class FichasService {

  private url = Servers.RehabMax.baseUrl + "/fichaClinica";
  private urlArchivo = Servers.RehabMax.baseUrl + "/fichaArchivo";
  constructor(private http: HttpClient) {}

  listarFichas(urlParams): Observable<any> {
    return this.http
      .get<any[]>(
        this.url + urlParams
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  filtrarFichas(urlFiltro): Observable<any> {
    console.log(this.url + urlFiltro)
    return this.http
      .get<any[]>(this.url + urlFiltro)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  crear(data): Observable<any> {
    console.log("data", data);
    let body = {
      motivoConsulta: data.motivoConsulta,
      diagnostico: data.diagnostico,
      observacion:data.observacion,
      idEmpleado:{
        idPersona:data.idEmpleado.idPersona
      },
      idCliente:{
        idPersona:data.idCliente.idPersona
      },
      idTipoProducto:{
        idTipoProducto: data.idTipoProducto.idTipoProducto
      }
    };
    return this.http
      .post<any[]>(this.url, body, {
        headers: {
          "Content-Type": "application/json",
          "usuario":"ana"
        }
      })
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  modificar(data){
    return this.http
      .put<any[]>(`${this.url}`, data, {
        headers: {
          "Content-Type": "application/json",
          "usuario":"ana"
        }
      })
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  agregarArchivo(element): Observable<any> {
    return this.http
      .post<any[]>(this.urlArchivo+"/archivo", element,{
        headers: {
          "Content-Type": "application/json",
          "usuario":"ana"
        }
      })
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  obtenerArchivo(idficha): Observable<any>{
    return this.http
    .get<any[]>(`${this.urlArchivo}?idFichaClinica=${idficha}`)
    .pipe(catchError(handleError("codigoMensaje", {})));
  }

  eliminarArchivo(idfichaArchivo){
    return this.http
      .delete<any[]>(
        `${this.urlArchivo}/${idfichaArchivo}` 
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
}
