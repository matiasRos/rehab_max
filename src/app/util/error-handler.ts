import {Observable, of} from 'rxjs';

export function handleError<T> (operationType = 'operation', result?: any) {
  return (error: any): Observable<any> => {

    let message = 'Ha ocurrido un error indeterminado.';
    let code = error.status;

    if (operationType === 'login'){
      message = error.error_description ? error.error_description: message;
    }else if (operationType === 'codigoMensaje'){
      message = error.mensaje;
      code = error.codigo;
    }else if (operationType === 'default'){
      if (error.error && error.error.message && error.error.code){
        message = error.error.message;
        code = error.error.code;
      }
    }
    return of({error: true, code, message});
  };
}
