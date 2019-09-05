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
}
