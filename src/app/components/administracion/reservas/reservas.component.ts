import { Component, OnInit } from "@angular/core";
import { ReservasService } from "src/app/services/reservas.service";
import { Reserva } from "src/app/models/reserva";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-reservas",
  templateUrl: "./reservas.component.html",
  styleUrls: ["./reservas.component.scss"]
})
export class ReservasComponent implements OnInit {
  reservas: any = [];
  loading: boolean;
  itemsTotalPagina: any = 5;
  totalItems: any = 0;
  descripcion: string = "";
  closeResult: string;
  urlFiltro: String = "";
  urlParams: string = "";
  fechaDesde: Date;
  fechaHasta: Date;
  fechaCadena: string="";
  horaInicioCadena: string="";
  horaFinCadena: string="";
  idEmpleado:number;
  idCliente:number;
  orderBy: string = "fechaCadena";
  orderDir: string = "desc";
  cantPorPagina: number = 5;
  fechaNacimiento: Date;
  filter: any = {};
  index: number = 0;
  inicio: number = 0;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.reservas.count
  };
  constructor(
    private reservaService: ReservasService,
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
    this.listarReservas();
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

  listarReservas() {
    this.loading = true;
    this.reservas = [];
    this.reservaService.listarReservas(this.urlParams).subscribe(result => {
      this.loading = false;
      if (result) {
        result.lista.forEach(a => {
          this.reservas.push(new Reserva(a));
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
      this.itemsTotalPagina = this.reservas.length;
    }
  }

  crearReserva() {
    var data = {
      fechaCadena: this.fechaCadena,
      horaInicioCadena: this.horaInicioCadena,
      horaFinCadena: this.horaFinCadena,
      idEmpleado:{
        idPersona:this.idEmpleado
      },
      idCliente:{
        idPersona:this.idCliente
      }
    };
    this.reservaService.crearReserva(data).subscribe(result => {
      this.reservas = "";
      this.addFilter();
    });
  }

  addFilter() {
    var data = {};
    if (this.filter.idEmpleado) {
      data["idEmpleado"] = this.filter.idEmpleado;
    }
    if (this.filter.idCliente) {
      data["idCliente"] = this.filter.idCliente;
    }
    if(this.filter.fechaDesde){
      data["fechaDesde"] = this.filter.fechaDesde;
    }
    if(this.filter.fechaHasta){
      data["fechaHasta"] = this.filter.fechaHasta;
    }
    if (this.filter.usuarioSistema) {
      data["soloUsuariosDelSistema"] = this.filter.usuarioSistema;
    }
    this.urlFiltro = "&ejemplo=" + JSON.stringify(data);
    this.filtrar(this.urlParams + this.urlFiltro);
  }

  filtrar(urlFiltro) {
    this.reservas = [];
    this.loading = true;
    this.reservaService.filtrarReservas(urlFiltro).subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      this.reservas = [];
      if (result) {
        result.lista.forEach(a => {
          this.reservas.push(new Reserva(a));
        });
        this.setCantPorPagina(result.totalDatos);
      }
    });
  }
 

  limpiar() {
    this.filter = {};
    this.listarReservas();
  }

  buscar_fisio(){
    
  }

  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.crearReserva();
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
