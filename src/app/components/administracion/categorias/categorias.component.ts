import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoriasServices } from "src/app/services/categorias.service";
import { Categoria } from "src/app/models/categoria";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"]
})
export class CategoriasComponent implements OnInit {
  categorias: any = [];
  loading: boolean;
  itemsTotalPagina: any = 5;
  totalItems: any = 10;
  descripcion: string = "";
  closeResult: string;
  dataSource: any = [];

  displayedColumns: string[] = ["idCategoria", "descripcion", "acciones"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private categoriaService: CategoriasServices,
    private modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit() {
    this.listarCategorias();
  }
  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.crearCategoria();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  listarCategorias() {
    this.loading = true;
    this.categorias = [];
    this.categoriaService.listarCategorias().subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      if (result) {
        this.dataSource = new MatTableDataSource(result.lista);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  crearCategoria() {
    var data = {
      descripcion: this.descripcion
    };
    this.categoriaService.crearCategoria(data).subscribe(result => {
      this.categorias = "";
      this.listarCategorias();
    });
  }

  verSubcategorias(id_cate) {
    console.log(id_cate);
    var url = "/subcategorias/" + id_cate + "/ver";
    this.router.navigate([url, {}]);
  }
}
