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
  horarios: any = [];
  itemsTotalPagina: any = 5;
  totalItems: any = 10;
  noHorario: string = "";
  closeResult: string;
  descripcion: string;
  constructor(
    private pacienteService: PacientesService,
    private empleadoService: EmpleadosService,
    private modalService: NgbModal,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id_persona = this.route.snapshot.paramMap.get("id");
    this.listarSubcategorias(this.id_persona);
  }

  listarSubcategorias(id) {
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
}
