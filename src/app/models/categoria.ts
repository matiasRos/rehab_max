export class Categoria {
  id: number;
  descripcion: string;

  constructor(data) {
    this.id = data.idCategoria;
    this.descripcion = data.descripcion;
  }
}
