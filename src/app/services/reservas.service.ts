import { Injectable } from "@angular/core";
import { Servers } from "../config/api";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { handleError } from "../util/error-handler";
@Injectable({
  providedIn: "root"
})
export class ReservasService {
  private url = Servers.RehabMax.baseUrl + "/reserva";
  constructor(private http: HttpClient) {}

  listarReservas(urlParams): Observable<any> {
    return this.http
      .get<any[]>(
        this.url + urlParams
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  filtrarReservas(urlFiltro): Observable<any> {
    console.log(this.url +""+urlFiltro);
    return this.http
      .get<any[]>(this.url + urlFiltro)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
  crear(data): Observable<any> {
    console.log("data", data);
    let body = {
      fechaCadena: data.fechaCadena,
      horaInicioCadena: data.horaInicioCadena,
      horaFinCadena: data.horaFinCadena,
      idEmpleado:{
        idPersona:data.idEmpleado.idPersona
      },
      idCliente:{
        idPersona:data.idCliente.idPersona
      },
      observacion:""
    }
    console.log("body", body);
    return this.http
      .post<any[]>(this.url, body, {
        headers: {
          "Content-Type": "application/json",
          "usuario":"ana"
        }
      })
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  obtenerPorEmpleado(empleado, desde, hasta) {
    return this.http
      .get<any[]>(
        `${this.url}?ejemplo={"idEmpleado":{"idPersona":${empleado}},"fechaDesdeCadena":"${desde}","fechaHastaCadena":"${hasta}"}` 
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
  obtenerPorCliente(cliente) {
    return this.http
      .get<any[]>(
        `${this.url}?ejemplo={"idCliente":{"idPersona":${cliente}}}` 
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
  cancelar(reserva) {
    return this.http
      .delete<any[]>(
        `${this.url}/${reserva}` 
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
  modificar(reserva, data){
    let headers = {"Content-Type": "application/json","usuario": "gustavo"}
    return this.http
      .put<any[]>(`${this.url}`, data, {headers: headers})
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
}
