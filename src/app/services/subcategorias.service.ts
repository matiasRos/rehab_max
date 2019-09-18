import { Injectable } from "@angular/core";
import { Servers } from "../config/api";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { handleError } from "../util/error-handler";
@Injectable({
  providedIn: "root"
})
export class SubcategoriasService {
  private url = Servers.RehabMax.baseUrl + "/tipoProducto";
  constructor(private http: HttpClient) {}

  listarSubcategorias(data): Observable<any> {
    let body = {
      idCategoria: { idCategoria: data }
    };

    //let datos = "{'idCategoria': {'idCategoria':" + data + "}}";
    let datos = JSON.stringify(body);
    console.log(datos);

    return this.http
      .get<any[]>(this.url + "?ejemplo=" + datos)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  listarporNombre(data): Observable<any> {
    let datos = JSON.stringify(data);
    console.log(datos);

    return this.http
      .get<any[]>(this.url + "?like=S&ejemplo=" + datos)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }

  listarAllSubcategorias(): Observable<any> {
    return this.http
      .get<any[]>(this.url)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
  crearSubcategoria(data): Observable<any> {
    var body = {
      descripcion: data.descripcion,
      idCategoria: {
        idCategoria: data.idCategoria
      }
    };
    return this.http
      .post<any[]>(this.url, body)
      .pipe(catchError(handleError("codigoMensaje", {})));
  }
}
