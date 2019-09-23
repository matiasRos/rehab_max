import { Injectable } from "@angular/core";
import { Servers } from "../config/api";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { handleError } from "../util/error-handler";
@Injectable({
  providedIn: "root"
})
export class EmpleadosService {
  private urlPersona = Servers.RehabMax.baseUrl + "/persona";
  private urlHorario = Servers.RehabMax.baseUrl + "/personaHorarioAgenda";

  constructor(private http: HttpClient) {}

  listarEmpleados(): Observable<any> {
    let body = {
      soloUsuariosDelSistema: true
    };

    let datos = JSON.stringify(body);
    console.log(datos);

    return this.http
      .get<any[]>(this.urlPersona + "?ejemplo=" + datos)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  listarHorarios(data): Observable<any> {
    let body = { idEmpleado: { idPersona: data } };

    let datos = JSON.stringify(body);
    console.log(datos);

    return this.http
      .get<any[]>(this.urlHorario + "?ejemplo=" + datos)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  nuevoHorario(data): Observable<any> {
    console.log("data", data);
    let body = data;
    return this.http
      .post<any[]>(this.urlHorario, body, {
        headers: {
          "Content-Type": "application/json;usuario:gustavo"
        }
      })
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  filtrarLike(data): Observable<any> {
    let body = {
      nombre: data.nombre,
      soloUsuariosDelSistema: true
    };
    let datos = JSON.stringify(body);
    return this.http
      .get<any[]>(this.urlPersona + "?like=S&ejemplo=" + datos)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  listarHorariosFechaDisponible(data): Observable<any> {
    let body = { 
      idEmpleado: { 
        idPersona: data 
      } 
    };

    let datos = JSON.stringify(body);
    console.log(datos);

    return this.http
      .get<any[]>(this.urlHorario + "?ejemplo=" + datos)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  listarHorariosDisponiblesEmpleado(empleado,fecha): Observable<any> {
    return this.http
      .get<any[]>(
        `${this.urlPersona}/${empleado}/agenda?fecha=${fecha}&disponible=S` 
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
}
