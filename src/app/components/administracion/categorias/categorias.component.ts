import { Component, OnInit } from '@angular/core';
import { CategoriasServices } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias:any=[];
  loading:boolean=true;
  itemsTotalPagina:any=5;
  totalItems:any=10;
  constructor( private categoriaService: CategoriasServices) { }

  ngOnInit() {
    this.listarCategorias();
  }
  
  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((result) => {
      this.loading=false;
      result.dato.forEach(a => {
        this.categorias.push(new Categoria(a));
      });
    })
  }
  callPagination(){

  }
}
