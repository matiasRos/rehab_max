import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Servers } from '../config/api';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { handleError } from '../util/error-handler';

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
      .pipe(catchError(handleError('codigoMensaje', {})));
  }

  listarServicios(): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(catchError(handleError('CodigoMensaje', {})));
  }

  listarServicioPorIdServicioCabecera(idServicio): Observable<any> {
    return this.http.get<any[]>(this.url + '/' + idServicio).pipe(catchError(handleError('CodigoMensaje', {})));
  }

  listarServicioPorIdServicioDetalle(idServicio): Observable<any> {
    return this.http.get<any[]>(this.url + '/' + idServicio + '/detalle').pipe(catchError(handleError('CodigoMensaje', {})));
  }
  obtenerServiciosRegistradosPorFisioterapeuta(idServicio): Observable<any> {
    return this.http.get<any[]>(this.url + 'ejemplo={"idFichaClinica":{"idCliente":{"idPersona":' + idServicio + '}}}');
  }

  listarPresentacionProducto(): Observable<any> {
    return this.http.get<any[]>(Servers.RehabMax.baseUrl + '/presentacionProducto');
  }
  listarObtenerServiciosPorPaciente(idPaciente): Observable<any> {
    return this.http.get<any[]>(this.url + '?ejemplo={"idFichaClinica":{"idCliente":{"idPersona":' +
      idPaciente + '}}}');
  }
  obtenerServiciosRealizadosPorFecha(fechaDesde, fechaHasta): Observable<any> {
    return this.http.get<any[]>(this.url + '?ejemplo={"fechaDesdeCadena":' + fechaDesde + ',"fechaHastaCadena":' + fechaHasta);
  }

  deleteUnServicio(idServicio, idDetalle): Observable<any> {
    return this.http.delete(this.url + '/' + idServicio + '/detalle/' + idDetalle);
  }

  agregarDetallesAServicio(idServicio, idPresentacionProducto, cantidad): Observable<any> {
    var body = {
      cantidad: cantidad,
      idPresentacionProducto: {
        idPresentacionProducto: idPresentacionProducto
      },
      idServicio: { idServicio: idServicio }
    };
    return this.http.post(this.url, body, {
      headers: {
        usuario: 'ana'
      }
    });
  }
  obtenerServiciosPorRangoFechas(urlFiltro): Observable<any> {
    const urlFinal = this.url + urlFiltro;
    return this.http.get<any[]>(urlFinal);
  }
}
