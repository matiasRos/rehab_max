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
}
