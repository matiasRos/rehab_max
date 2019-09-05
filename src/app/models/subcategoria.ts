export class Subcategoria {
  id: number;
  descripcion: string;
  idCategoria: number;

  constructor(data) {
    this.id = data.idTipoProducto;
    this.descripcion = data.descripcion;
    this.idCategoria = data.idCategoria;
  }
}
