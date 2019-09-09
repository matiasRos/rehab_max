import { Injectable } from "@angular/core";
import { Servers } from "../config/api";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { handleError } from "../util/error-handler";
@Injectable({
  providedIn: "root"
})
export class PacientesService {
  private url = Servers.RehabMax.baseUrl + "/persona";
  constructor(private http: HttpClient) {}

  listarPacientes(): Observable<any> {
    return this.http
      .get<any[]>(
        /* TRAEMOS DE A 50*/

        this.url + "?inicio=0&cantidad=50&orderBy=apellido&orderDir=desc"
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  filtrarPacientes(data): Observable<any> {
    let body = {
      nombre: data.nombre,
      apellido: data.apellido,
      soloUsuariosDelSistema: data.soloUsuariosDelSistema
    };

    let datos = JSON.stringify(body);
    console.log(datos);

    return this.http
      .get<any[]>(this.url + "?ejemplo=" + datos)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  filtrarLike(data): Observable<any> {
    let body = {
      nombre: data.nombre
    };

    let datos = JSON.stringify(body);
    console.log(datos);

    return this.http
      .get<any[]>(this.url + "?like=S&ejemplo=" + datos)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  crearPaciente(data): Observable<any> {
    var body = {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      ruc: data.ruc,
      cedula: data.cedula,
      tipoPersona: data.tipoPersona,
      fechaNacimiento: data.fechaNacimiento + " 00:00:00"
    };
    return this.http
      .post<any[]>(this.url, body)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
}
