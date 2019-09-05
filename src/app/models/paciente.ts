export class Paciente {
  idPersona: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  ruc: string;
  cedula: string;
  fechaNacimiento: Date;
  tipoPersona: string;

  constructor(data) {
    this.idPersona = data.idPersona;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.telefono = data.telefono;
    this.email = data.email;
    this.ruc = data.ruc;
    this.cedula = data.cedula;
    this.fechaNacimiento = data.fechaNacimiento;
    this.tipoPersona = data.tipoPersona;
  }
}
