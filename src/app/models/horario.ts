export class Horario {
  dia: number;
  diaCadena: string;
  horaAperturaCadena: string;
  horaCierreCadena: string;
  intervaloMinutos: number;
  idEmpleado: number;

  constructor(data) {
    this.dia = data.dia;
    this.diaCadena = data.diaCadena;
    this.horaAperturaCadena = data.horaAperturaCadena;
    this.horaCierreCadena = data.horaCierreCadena;
    this.intervaloMinutos = data.intervaloMinutos;
    this.idEmpleado = data.idEmpleado.idPersona;
  }
}
