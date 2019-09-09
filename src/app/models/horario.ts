export class Horario {
  dia: number;
  horaAperturaCadena: string;
  horaCierreCadena: string;
  intervaloMinutos: number;
  idEmpleado: {
    idPersona: number;
  };

  constructor(data) {
    this.dia = data.dia;
    this.horaAperturaCadena = data.horaAperturaCadena;
    this.horaCierreCadena = data.horaCierreCadena;
    this.intervaloMinutos = data.intervaloMinutos;
    this.idEmpleado.idPersona = data.idEmpleado.idPersona;
  }
}
