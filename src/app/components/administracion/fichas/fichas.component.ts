import { Component, OnInit } from "@angular/core";
import { ReservasService } from "src/app/services/reservas.service";
import { PacientesService } from "src/app/services/pacientes.service";
import { EmpleadosService } from "src/app/services/empleados.service";
import { Paciente } from "src/app/models/paciente";
import { FichasService } from "src/app/services/fichas.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.scss']
})
export class FichasComponent implements OnInit {
  fichas; any=[];
  doctores: any = [];
  clientes: any = [];
  productos: any = [];
  paciente: string = "";
  doctor: string = "";
  isDoctor: boolean=false;
  isCliente: boolean=false;
  idFichaClinica: number;
  file: File = null;
  motivoConsulta: string="";
  diagnostico: string="";
  observacion: string="";
  idEmpleado: number;
  idCliente: number;
  idTipoProducto: number;
  loading: boolean;
  itemsTotalPagina: any = 5;
  totalItems: any = 0;
  closeResult: string;
  urlFiltro: String = "";
  urlParams: string = "";
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
    totalItems: this.fichas.count
  };
  constructor(
    private fichaService: FichasService,
    private reservaService: ReservasService,
    private empleadoService: EmpleadosService,
    private pacienteService: PacientesService,
    private modalService: NgbModal,
    public router: Router
  ) { }

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

  listarFichas() {
    this.loading = true;
    this.fichas = [];
    this.fichaService.listarFichas(this.urlParams).subscribe(result => {
      this.loading = false;
      if (result) {
        result.lista.forEach(a => {
          this.fichas.push(a);
        });
        this.setCantPorPagina(result.totalDatos);
      }
    });
  }

  listarDoctores() {
    this.loading = true;
    this.doctores = [];
    this.empleadoService.listarEmpleados().subscribe(result => {
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
      this.itemsTotalPagina = this.fichas.length;
    }
  }

  crearFicha() {
    var data = {
      motivoConsulta: this.motivoConsulta,
      diagnostico: this.diagnostico,
      observacion:this.observacion,
      idEmpleado:{
        idPersona:this.idEmpleado
      },
      idCliente:{
        idPersona:this.idCliente
      },
      idTipoProducto:{
        idTipoProducto: this.idTipoProducto
      }
    };
    console.log(data)
    this.fichaService.crear(data).subscribe(result => {
      console.log(result,result.lista)
      this.fichas = [];
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
    if(this.filter.idTipoProducto){
      data["idTipoProducto"] = {
        idTipoProducto:this.idTipoProducto
      };
    }
    this.urlFiltro = "?ejemplo=" + JSON.stringify(data);
    this.filtrar(this.urlParams + this.urlFiltro);
  }

  filtrar(urlFiltro) {
    this.fichas = [];
    this.loading = true;
    this.fichaService.filtrarFichas(urlFiltro).subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      this.fichas = [];
      if (result) {
        result.lista.forEach(a => {
          console.log(a);
          this.fichas.push(a);
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
    this.empleadoService.filtrarLike(data).subscribe(result => {
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
    (<HTMLInputElement>document.getElementById("id_categoria")).value = "";
    (<HTMLInputElement>document.getElementById("id_tipoProducto")).value = "";
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
  }

  modificarReserva(){
    let data = {
      idFichaClinica : this.idFichaClinica,
      observacion : this.observacion,
    };
    this.fichaService.modificar(data).subscribe(result => {
      this.fichas = [];
      this.addFilter();
    });
  }
  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.crearFicha();
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
