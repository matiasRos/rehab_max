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
    return this.http
      .get<any[]>(this.url + urlFiltro)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  crearReserva(data): Observable<any> {
    var body = {
      fechaCadena: data.fechaCadena,
      horaInicioCadena: data.horaInicioCadena,
      horaFinCadena: data.horaFinCadena,
      idEmpleado:{
        idPersona:data.idPersona
      },
      idCliente:{
        idPersona:data.idPersona
      },
    };
    return this.http
      .post<any[]>(this.url, body)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
}
