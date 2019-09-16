import { Component, OnInit } from "@angular/core";
import { EmpleadosService } from "src/app/services/empleados.service";
import { Paciente } from "src/app/models/paciente";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.scss"]
})
export class EmpleadosComponent implements OnInit {
  empleados: any = [];
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
  config = {
    itemsPerPage: 2,
    currentPage: 1,
    totalItems: this.empleados.count
  };

  constructor(
    private empleadoService: EmpleadosService,
    private modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit() {
    this.listarEmpleados();
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  listarEmpleados() {
    this.loading = true;
    this.empleados = [];
    this.empleadoService.listarEmpleados().subscribe(result => {
      this.loading = false;
      console.log(result.lista);
      result.lista.forEach(a => {
        this.empleados.push(new Paciente(a));
      });
    });
  }

  gestionar(elemento) {
    console.log(elemento);
    var url = "/empleados/" + elemento.idPersona + "/gestionar";
    this.router.navigate([url, {}]);
  }
}
