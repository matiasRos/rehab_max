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
        this.url + "?inicio=0&cantidad=3&orderBy=apellido&orderDir=desc"
      )
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
}
