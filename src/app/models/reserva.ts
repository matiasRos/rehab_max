export class Reserva {
    fecha: number;
    fechaCadena: string;
    horaInicioCadena: string;
    horaFinCadena: string;
    idEmpleado: number;
    idCliente: number;
  
    constructor(data) {
      this.fecha = data.fecha;
      this.fechaCadena = data.fechaCadena;
      this.horaInicioCadena = data.horaInicioCadena;
      this.horaFinCadena = data.horaFinCadena;
      this.idEmpleado = data.idEmpleado.idPersona;
      this.idCliente = data.idCliente.idPersona;
    }
  }