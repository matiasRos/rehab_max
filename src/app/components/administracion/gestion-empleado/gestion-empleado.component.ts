import { Component, OnInit } from "@angular/core";
import { PacientesService } from "src/app/services/pacientes.service";
import { EmpleadosService } from "src/app/services/empleados.service";
import { Paciente } from "src/app/models/paciente";
import { Horario } from "src/app/models/horario";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-gestion-empleado",
  templateUrl: "./gestion-empleado.component.html",
  styleUrls: ["./gestion-empleado.component.scss"]
})
export class GestionEmpleadoComponent implements OnInit {
  id_persona: any;
  loading: boolean;
  existenHorarios: boolean;
  mostrarHorarioNormal: boolean = true;
  mostrarHorarioExcep: boolean = false;
  mostrarHorarioPorDia: boolean = false;
  horarios: any = [];
  horariosExcep: any = [];
  horarioPorDia: any = [];
  itemsTotalPagina: any = 5;
  totalItems: any = 10;
  noHorario: string = "";
  closeResult: string;
  descripcion: string;
  fechaexcep: string;
  nuevo: any = {};
  diaSemana: number;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.horarios.count
  };
  constructor(
    private pacienteService: PacientesService,
    private empleadoService: EmpleadosService,
    private modalService: NgbModal,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id_persona = this.route.snapshot.paramMap.get("id");
    this.listarHorario(this.id_persona);
  }

  limpiar() {
    this.mostrarHorarioNormal = true;
    this.mostrarHorarioExcep = false;
    this.mostrarHorarioPorDia = false;
    this.listarHorario(this.id_persona);
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.nuevoHorario();
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

  crearModalExcep(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.getExcepFecha();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReasonExcep(reason)}`;
        }
      );
  }
  private getDismissReasonExcep(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  crearNuevaExcep(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.postExcepFecha();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReasonNewExcep(
            reason
          )}`;
        }
      );
  }
  private getDismissReasonNewExcep(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  nuevoHorario() {
    console.log(this.nuevo);
    let data = this.nuevo;
    data.horaAperturaCadena = data.horaAperturaCadena.replace(/:/g, "");
    data.horaCierreCadena = data.horaCierreCadena.replace(/:/g, "");

    let param = {
      dia: data.dia,
      horaAperturaCadena: data.horaAperturaCadena,
      horaCierreCadena: data.horaCierreCadena,
      intervaloMinutos: data.intervaloMinutos,
      idEmpleado: {
        idPersona: this.id_persona
      }
    };
    console.log(param);
    this.empleadoService.nuevoHorario(param).subscribe(result => {
      this.horarios = "";
      this.listarHorario(this.id_persona);
    });
  }

  verTodos() {
    this.horarios = "";
    this.listarHorario(this.id_persona);
  }

  listarHorario(id) {
    this.existenHorarios = false;
    this.loading = true;
    this.horarios = [];
    this.empleadoService.listarHorarios(id).subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      if (result.lista.length > 0) {
        this.existenHorarios = true;
      } else {
        this.noHorario = "No existen horarios";
      }
      result.lista.forEach(a => {
        this.horarios.push(new Horario(a));
      });
    });
  }

  postExcepFecha() {
    let answ = this.fechaexcep
      .split("/")
      .reverse()
      .join("");
    var data = {
      fechaCadena: answ,
      flagEsHabilitar: "N",
      idEmpleado: {
        idPersona: this.id_persona
      }
    };
    this.empleadoService.nuevaExcepcion(data).subscribe(result => {
      this.horarios = "";
      this.listarHorario(this.id_persona);
    });
  }

  getExcepFecha() {
    console.log(this.fechaexcep);
    let answ = this.fechaexcep
      .split("/")
      .reverse()
      .join("");
    console.log(answ);
    var data = {
      fechaCadena: answ
    };
    this.empleadoService.listarExcepFecha(data).subscribe(result => {
      if (result) {
        this.mostrarHorarioNormal = false;
        this.mostrarHorarioExcep = true;
        result.lista.forEach(a => {
          var he = {
            fecha: a.fecha,
            horaApertura: a.horaApertura,
            horaCierre: a.horaCierre
          };
          this.horariosExcep.push(he);
        });
      }
    });
  }

  setDiaFiltro() {
    let data = {
      diaSemana: this.diaSemana,
      idPersona: this.id_persona
    };
    this.empleadoService.listarPorDia(data).subscribe(result => {
      if (result) {
        this.mostrarHorarioNormal = false;
        this.mostrarHorarioExcep = false;
        this.mostrarHorarioPorDia = true;
        console.log(result.lista);
        this.horarioPorDia = [];
        result.lista.forEach(a => {
          this.horarioPorDia.push(new Horario(a));
        });
      }
    });
  }
}
