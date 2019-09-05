import { Component, OnInit } from "@angular/core";
import { PacientesService } from "src/app/services/pacientes.service";
import { Paciente } from "src/app/models/paciente";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "app-pacientes",
  templateUrl: "./pacientes.component.html",
  styleUrls: ["./pacientes.component.scss"]
})
export class PacientesComponent implements OnInit {
  pacientes: any = [];
  loading: boolean;
  itemsTotalPagina: any = 5;
  totalItems: any = 10;
  descripcion: string = "";
  closeResult: string;
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  telefono: string = "";
  ruc: string = "";
  cedula: string = "";
  tipoPersona: string = "";
  fechaNacimiento: Date;
  constructor(
    private pacienteService: PacientesService,
    private modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit() {
    this.listarPacientes();
  }

  listarPacientes() {
    this.loading = true;
    this.pacientes = [];
    this.pacienteService.listarPacientes().subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      result.lista.forEach(a => {
        this.pacientes.push(new Paciente(a));
      });
    });
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
      this.listarPacientes();
    });
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
