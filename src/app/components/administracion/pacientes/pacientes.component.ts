import { Component, OnInit } from "@angular/core";
import { PacientesService } from "src/app/services/pacientes.service";
import { Paciente } from "src/app/models/paciente";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
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
    totalItems: this.pacientes.count
  };
  constructor(
    private pacienteService: PacientesService,
    private modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit() {
    /*this.urlParams =
      "?orderBy=" +
      this.orderBy +
      "&orderDir=" +
      this.orderDir +
      "&cantidad=" +
      this.cantPorPagina +
      "&inicio=" +
      this.inicio;*/
    this.listarPacientes();
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  callPagination(pagina) {
    if (pagina) {
      if (pagina == 1) {
        this.inicio = this.inicio + +this.cantPorPagina;
      } else if (pagina == -1) {
        this.inicio = this.inicio - +this.cantPorPagina;
      }
      this.index = this.index + pagina;
      $(".prev").removeClass("disabled");
      $(".nxt").removeClass("disabled");
      if (this.index <= 0) {
        $(".prev").addClass("disabled");
      }
      if (this.inicio + +this.cantPorPagina >= this.totalItems) {
        $(".nxt").addClass("disabled");
      }
    }
    this.urlParams =
      "?orderBy=" +
      this.orderBy +
      "&orderDir=" +
      this.orderDir +
      "&cantidad=" +
      this.cantPorPagina +
      "&inicio=" +
      this.inicio;
    this.addFilter();
  }

  listarPacientes() {
    this.loading = true;
    this.pacientes = [];
    this.pacienteService.listarPacientes(this.urlParams).subscribe(result => {
      this.loading = false;
      if (result) {
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
    this.urlFiltro = "&ejemplo=" + JSON.stringify(data);
    this.filtrar(this.urlParams + this.urlFiltro);
  }

  filtrar(urlFiltro) {
    this.pacientes = [];
    this.loading = true;
    this.pacienteService.filtrarPacientes(urlFiltro).subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      this.pacientes = [];
      if (result) {
        result.lista.forEach(a => {
          this.pacientes.push(new Paciente(a));
        });
        this.setCantPorPagina(result.totalDatos);
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
