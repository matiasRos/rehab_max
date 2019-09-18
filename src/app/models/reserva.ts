export class Reserva {
    idReserva: number;
    fechaCadena: string;
    horaInicioCadena: string;
    horaFinCadena: string;
    idEmpleado: {
      idPersona: number
    };
    idCliente: {
      idPersona: number
    };
    constructor(data) {
      this.fechaCadena = data.fechaCadena;
      this.horaInicioCadena = data.horaInicioCadena;
      this.horaFinCadena = data.horaFinCadena;
      this.idEmpleado = data.idEmpleado.idPersona;
      this.idCliente = data.idCliente.idPersona;
      this.idReserva = data.idReserva;
    }
  }