export class Categoria{
    id:number;
    descripcion: string;
   
    constructor(data){
      this.id = data.id;
      this.descripcion = data.descripcion;
    }
  }
  