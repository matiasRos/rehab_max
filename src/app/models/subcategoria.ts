export class Subcategoria {
  id: number;
  descripcion: string;

  constructor(data) {
    this.id = data.idTipoProducto;
    this.descripcion = data.descripcion;
    this.idCategoria = data.idCategoria;
  }
}
