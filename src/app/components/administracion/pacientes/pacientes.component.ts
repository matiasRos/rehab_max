import { Component, OnInit, ViewChild } from "@angular/core";
import { PacientesService } from "src/app/services/pacientes.service";
import { Paciente } from "src/app/models/paciente";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import * as $ from "jquery";

@Component({
  selector: "app-pacientes",
  templateUrl: "./pacientes.component.html",
  styleUrls: ["./pacientes.component.scss"]
})
export class PacientesComponent implements OnInit {
  pacientes: any = [];
  loading: boolean;
  itemsTotalPagina: any = 5;
  totalItems: any = 0;
  descripcion: string = "";
  closeResult: string;
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  telefono: string = "";
  ruc: string = "";
  cedula: string = "";
  tipoPersona: string = "";
  urlFiltro: String = "";
  urlParams: string = "";
  cantPorPagina: number = 5;
  fechaNacimiento: Date;
  filter: any = {};
  index: number = 0;
  inicio: number = 0;
  dataSource: any = [];
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.pacientes.count
  };
  displayedColumns: string[] = [
    "nombre",
    "apellido",
    "cedula",
    "ruc",
    "tipoPersona",
    "fechaNacimiento",
    "telefono"
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private pacienteService: PacientesService,
    private modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit() {
    this.listarPacientes();
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  listarPacientes() {
    this.loading = true;
    this.pacientes = [];
    this.pacienteService.listarPacientes(this.urlParams).subscribe(result => {
      this.loading = false;
      if (result) {
        this.dataSource = new MatTableDataSource(result.lista);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        result.lista.forEach(a => {
          this.pacientes.push(new Paciente(a));
        });
        this.setCantPorPagina(result.totalDatos);
      }
    });
  }

  setCantPorPagina(totalDatos) {
    this.totalItems = totalDatos;
    if (totalDatos < this.cantPorPagina) {
      this.itemsTotalPagina = totalDatos;
    } else {
      this.itemsTotalPagina = this.pacientes.length;
    }
  }

  crearPaciente() {
    var data = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      ruc: this.ruc,
      cedula: this.cedula,
      tipoPersona: this.tipoPersona,
      fechaNacimiento: this.fechaNacimiento
    };
    this.pacienteService.crearPaciente(data).subscribe(result => {
      this.pacientes = "";
      this.addFilter();
    });
  }

  addFilter() {
    var data = {};
    if (this.filter.nombre) {
      data["nombre"] = this.filter.nombre;
    }
    if (this.filter.apellido) {
      data["apellido"] = this.filter.apellido;
    }
    if (this.filter.usuarioSistema) {
      data["soloUsuariosDelSistema"] = this.filter.usuarioSistema;
    }
    this.urlFiltro = "?ejemplo=" + JSON.stringify(data);
    this.filtrar(this.urlParams + this.urlFiltro);
  }

  filtrar(urlFiltro) {
    this.pacientes = [];
    this.dataSource = [];
    this.loading = true;
    this.pacienteService.filtrarPacientes(urlFiltro).subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      this.pacientes = [];
      if (result) {
        this.dataSource = new MatTableDataSource(result.lista);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  //Por ahora no usamos
  filtroLike() {
    var data = {
      nombre: ""
    };
    this.pacienteService.filtrarLike(data).subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      this.pacientes = [];
      result.lista.forEach(a => {
        this.pacientes.push(new Paciente(a));
      });
    });
  }

  limpiar() {
    this.filter = {};
    this.listarPacientes();
  }

  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.crearPaciente();
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
