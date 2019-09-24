import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { ServiciosService } from "src/app/services/servicios.service";
import * as $ from "jquery";
import { SubcategoriasService } from "src/app/services/subcategorias.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.scss"]
})
export class ServiciosComponent implements OnInit {
  servicios: any = [];
  subcategorias: any = [];
  loading: boolean;
  itemsTotalPagina: any = 5;
  totalItems: any = 0;
  descripcion: string = "";
  closeResult: string;
  nombre: string = "";
  precio: number;
  tipoPersona: string = "";
  urlFiltro: String = "";
  urlParams: string = "";
  orderBy: string = "nombre";
  orderDir: string = "desc";
  cantPorPagina: number = 5;
  fechaNacimiento: Date;
  filter: any = {};
  index: number = 0;
  inicio: number = 0;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.servicios.count
  };
  
  dataSource: any = [];
  displayedColumns: string[] = [
    "id",
    "servicio",
    "descripcion",
    "tipoServicio"
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private serviciosService: ServiciosService,
    private modalService: NgbModal,
    private subcategoriasService: SubcategoriasService,
    public router: Router
  ) { }

  ngOnInit() {
    this.listarServicios();
    this.listarSubcategorias();
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  listarServicios() {
    this.loading = true;
    this.servicios = [];
    this.serviciosService.listarServicios(this.urlParams).subscribe(result => {
      this.loading = false;
      if (result) {
        console.log("ser ",result.lista)
        this.dataSource = new MatTableDataSource(result.lista);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.servicios = result.lista;
      }
    });
  }

  listarSubcategorias() {
    this.loading = true;
    this.subcategorias = [];
    this.subcategoriasService.listarAllSubcategorias().subscribe(result => {
      this.loading = false;
      if (result) {
         result.lista.forEach(a => {
           this.subcategorias = result.lista;
        });
      }
    });
  }

  crearServicio() {
    var data = {
        nombre: this.nombre,
        precio: this.precio
    };
    this.serviciosService.crearServicioEntidad(data).subscribe(result => {
      this.servicios = "";
      this.nombre="";
      this.addFilter();
    });
  }

  addFilter() {
    var data = {};
    if (this.filter.nombre) {
      data["nombre"] = this.filter.nombre;
    }
    if (this.filter.subcategoria && this.filter.subcategoria != 0) {
      data["idProducto"] = {
        idTipoProducto: { idTipoProducto: this.filter.subcategoria }
      };
    }
    if (this.urlParams.length === 0) {
      this.urlFiltro = "?ejemplo=" + encodeURIComponent(JSON.stringify(data));
    } else {
      this.urlFiltro = "&ejemplo=" + encodeURIComponent(JSON.stringify(data));
    }

    this.filtrar(this.urlParams + this.urlFiltro);
  }

  filtrar(urlFiltro) {
    this.servicios = [];
    this.loading = true;
    this.serviciosService.filtrarServicios(urlFiltro).subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      this.servicios = [];
      if (result) {
        this.servicios = result.lista;
      }
      this.dataSource = new MatTableDataSource(result.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  limpiar() {
    this.filter = {};
    this.listarServicios();
  }

  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.crearServicio();
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
}
