import { Component, OnInit } from "@angular/core";
import { ReservasService } from "src/app/services/reservas.service";
import { PacientesService } from "src/app/services/pacientes.service";
import { EmpleadosService } from "src/app/services/empleados.service";
import { Reserva } from "src/app/models/reserva";
import { Paciente } from "src/app/models/paciente";
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
  doctores: any = [];
  clientes: any = [];
  horarios: any = [];
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
  idEmpleado: number;
  idCliente: number;
  IdReserva: number;
  observacion: string="";
  turno: string="";
  isDoctor: boolean=false;
  isCliente: boolean=false;
  doctor: String="";
  paciente: String='';
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
    private empleados: EmpleadosService,
    private pacienteService: PacientesService,
    private modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit() {
    this.addFilter();
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

  listarHorarios(){
    this.loading = true;
    let fecha = (<HTMLInputElement>document.getElementById("id_fechaCadena")).value.replace("-","").replace("-","")
    this.horarios = [];
    this.empleados.listarHorariosDisponiblesEmpleado(this.idEmpleado, fecha).subscribe(result => {
      this.loading = false;
      if (result) {
        result.forEach(a => {
          a.horaInicioCadena = a.horaInicioCadena.slice(0,2)+ ":" +a.horaInicioCadena.slice(2,4);
          a.horaFinCadena = a.horaFinCadena.slice(0,2) + ":" + a.horaFinCadena.slice(2,4);
          console.log(a);
          this.horarios.push(a);
        });
      }
    });
  }

  listarDoctores() {
    this.loading = true;
    this.doctores = [];
    this.empleados.listarEmpleados().subscribe(result => {
      this.loading = false;
      result.lista.forEach(a => {
        this.doctores.push(new Paciente(a));
      });
    });
  }

  listarPacientes() {
    this.loading = true;
    this.clientes = [];
    this.pacienteService.listarPacientes(this.urlParams).subscribe(result => {
      this.loading = false;
      if (result) {
        result.lista.forEach(a => {
          this.clientes.push(new Paciente(a));
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
      fechaCadena: this.fechaCadena.replace("-","").replace("-",""),
      horaInicioCadena: this.horaInicioCadena.replace(":",""),
      horaFinCadena: this.horaFinCadena.replace(":",""),
      idEmpleado:{
        idPersona:this.idEmpleado
      },
      idCliente:{
        idPersona:this.idCliente
      },
      observacion:this.observacion
    };
    console.log(data)
    this.reservaService.crear(data).subscribe(result => {
      console.log(result,result.lista)
      this.reservas = [];
      this.addFilter();
    });
  }

  addFilter() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    var data = {};

    data["fechaDesdeCadena"]=data["fechaHastaCadena"]=yyyy+mm+dd;
    if ((<HTMLInputElement>document.getElementById("id_fisioterapeuta")).value != "") {
      data["idEmpleado"] = {
        idPersona:this.idEmpleado
      };
    }
    if ((<HTMLInputElement>document.getElementById("id_cliente")).value != "") {
      data["idCliente"] = {
        idPersona:this.idCliente
      };
    }
    if(this.filter.fechaDesde){
      data["fechaDesdeCadena"] = this.filter.fechaDesde.replace("-","").replace("-","");
    }
    if(this.filter.fechaHasta){
      data["fechaHastaCadena"] = this.filter.fechaHasta.replace("-","").replace("-","");
    }
    this.urlFiltro = "?ejemplo=" + JSON.stringify(data);
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
          console.log(a);
          this.reservas.push(a);
        });
        this.setCantPorPagina(result.totalDatos);
      }
    });
  }
 
  filtroCliente() {
    var data;
    let valor=(<HTMLInputElement>document.getElementById("idClienteBuscar")).value;
    if( valor != "") {
      data = {
        nombre: valor
      };
    }else{
      data = {
        nombre: ""
      };
    }

    this.pacienteService.filtrarLike(data).subscribe(result => {
      this.loading = false;
      this.clientes = [];
      result.lista.forEach(a => {
        this.clientes.push(new Paciente(a));
      });
    });
  }
  filtroDoctor() {
    var data;
    let valor=(<HTMLInputElement>document.getElementById("idEmpleadoBuscar")).value;
    console.log("valor",valor);
    if( valor!= "") {
      data = {
        nombre: valor
      };
    }else{
      data = {
        nombre: ""
      };
    }
    this.empleados.filtrarLike(data).subscribe(result => {
      this.loading = false;
      this.doctores = [];
      result.lista.forEach(a => {
        this.doctores.push(new Paciente(a));
      });
    });
  }

  limpiar() {
    this.filter = {};
    this.paciente = "";
    this.doctor = "";
    (<HTMLInputElement>document.getElementById("id_fisioterapeuta")).value = "";
    (<HTMLInputElement>document.getElementById("id_cliente")).value = "";
    this.addFilter();
  }

  buscar_fisio(){
    this.listarDoctores();
  }

  buscar_cliente(){
    this.listarPacientes();
  }
  putFilter(){
    if(this.isDoctor){
      (<HTMLInputElement>document.getElementById("id_fisioterapeuta")).value = this.doctor + '';
    }
    this.isDoctor=false;
    if(this.isCliente){
      (<HTMLInputElement>document.getElementById("id_cliente")).value = this.paciente + '';
    }
    this.isCliente=false;
  }
  doctorClick(){
    this.isDoctor=true
  }

  clienteClick(){
    this.isCliente=true
  }

  setModificar(){
    (<HTMLInputElement>document.getElementById("id_observacion")).value = this.observacion;
    if(this.turno=='S'){
      (<HTMLInputElement>document.getElementById("id_turno")).checked = true;
    }
  }

  modificarReserva(){
    console.log('obs:'+this.observacion);
    console.log('turno:'+this.turno);
    let data = {
      idReserva : this.IdReserva,
      observacion : this.observacion,
      flagAsistio : ((this.turno) ? 'S' : '')
    };
    this.reservaService.modificar(data).subscribe(result => {
      this.reservas = [];
      this.addFilter();
    });
  }
  newFichaReserva(){

  }
  cancelarReserva(){
    this.reservaService.cancelar(this.IdReserva).subscribe(result => {
      this.reservas = [];
      this.addFilter();
    });
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
