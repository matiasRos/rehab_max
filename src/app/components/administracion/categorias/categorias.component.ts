import { Component, OnInit } from '@angular/core';
import { CategoriasServices } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias:any=[];
  loading:boolean;
  itemsTotalPagina:any=5;
  totalItems:any=10;
  descripcion:string="";
  closeResult: string;
  constructor( private categoriaService: CategoriasServices,private modalService: NgbModal) { }

  ngOnInit() {
    this.listarCategorias();
  }
  crearModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.crearCategoria();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  listarCategorias() {
    this.loading=true;
    this.categorias=[];
    this.categoriaService.listarCategorias().subscribe((result) => {
      this.loading=false;
      result.lista.forEach(a => {
        this.categorias.push(new Categoria(a));
      });
    })
  }
  crearCategoria(){
    var data = {
      "descripcion":this.descripcion
    }
    this.categoriaService.crearCategoria(data).subscribe((result) => {
      this.categorias="";
      this.listarCategorias();
    })
  }
  callPagination(){

  }
}
