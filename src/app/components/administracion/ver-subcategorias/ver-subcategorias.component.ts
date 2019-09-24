import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoriasServices } from "src/app/services/categorias.service";
import { SubcategoriasService } from "src/app/services/subcategorias.service";
import { Categoria } from "src/app/models/categoria";
import { Subcategoria } from "src/app/models/subcategoria";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

@Component({
  selector: "app-ver-subcategorias",
  templateUrl: "./ver-subcategorias.component.html",
  styleUrls: ["./ver-subcategorias.component.scss"]
})
export class VerSubcategoriasComponent implements OnInit {
  id_categoria: any;
  loading: boolean;
  existenSub: boolean;
  subcategorias: any = [];
  itemsTotalPagina: any = 5;
  totalItems: any = 10;
  noSubs: string = "";
  closeResult: string;
  descripcion: string;
  nombreSub: string;
  dataSource: any = [];

  displayedColumns: string[] = ["idTipoProducto", "descripcion"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private categoriaService: CategoriasServices,
    private subcategoriasService: SubcategoriasService,
    private modalService: NgbModal,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id_categoria = this.route.snapshot.paramMap.get("id");
    console.log(this.id_categoria);
    this.listarSubcategorias(this.id_categoria);
  }

  crearSubcategoria() {
    var data = {
      descripcion: this.descripcion,
      idCategoria: this.id_categoria
    };
    this.subcategoriasService.crearSubcategoria(data).subscribe(result => {
      this.subcategorias = "";
      this.descripcion = "";
      this.listarSubcategorias(this.id_categoria);
    });
  }

  listarPorNombre() {
    if (this.nombreSub) {
      var data = { descripcion: this.nombreSub };
      this.subcategoriasService.listarporNombre(data).subscribe(result => {
        if (result.lista.length > 0) {
          this.dataSource = new MatTableDataSource(result.lista);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }

  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.crearSubcategoria();
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

  listarSubcategorias(id) {
    this.existenSub = false;
    this.loading = true;
    this.subcategorias = [];
    this.subcategoriasService.listarSubcategorias(id).subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      if (result.lista.length > 0) {
        this.existenSub = true;
        this.dataSource = new MatTableDataSource(result.lista);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.noSubs = "No existen subcategorias de esta categoria :(";
      }
    });
  }
}
