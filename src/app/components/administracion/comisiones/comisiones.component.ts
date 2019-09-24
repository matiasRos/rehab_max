import { Component, OnInit, ViewChild } from "@angular/core";
import { EmpleadosService } from "src/app/services/empleados.service";
import { RegistrarService } from "src/app/services/registrar.service";
import { Paciente } from "src/app/models/paciente";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatFormField
} from "@angular/material";

@Component({
  selector: "app-comisiones",
  templateUrl: "./comisiones.component.html",
  styleUrls: ["./comisiones.component.scss"]
})
export class ComisionesComponent implements OnInit {
  comisiones: any = [];
  empleados: any = [];
  presprod: any = [];
  fisio: any;
  presproducto: any;
  dataSource: any = [];

  displayedColumns: string[] = [
    "fechaHora",
    "empleado",
    "local",
    "presentacion_producto"
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private empleadoService: EmpleadosService,
    private registrarService: RegistrarService
  ) {}

  ngOnInit() {
    this.listarComisiones();
    this.listarEmpleados();
    this.listarPP();
  }

  listarComisiones() {
    this.comisiones = [];
    this.empleadoService.listarComisiones().subscribe(result => {
      if (result) {
        console.log(result.lista);
        this.dataSource = new MatTableDataSource(result.lista);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  listarEmpleados() {
    this.empleados = [];
    this.empleadoService.listarEmpleados().subscribe(result => {
      if (result) {
        result.lista.forEach(a => {
          const elem = {
            idPersona: a.idPersona,
            nombre: a.nombre,
            apellido: a.apellido,
            ruc: a.ruc
          };
          this.empleados.push(elem);
        });
      }
    });
  }

  listarPP() {
    this.presprod = [];
    this.registrarService.listarPresentacionProducto().subscribe(result => {
      if (result) {
        result.lista.forEach(a => {
          const elem = {
            idPresentacionProducto: a.idPresentacionProducto,
            descripcion: a.descripcion
          };
          this.presprod.push(elem);
        });
      }
    });
  }

  setFisio() {}

  limpiar() {
    this.presproducto = null;
    this.fisio = null;
    this.listarComisiones();
  }

  filtrar() {
    let data = {
      prod: null,
      fisio: null
    };
    if (this.presproducto) {
      data.prod = this.presproducto;
    }
    if (this.fisio) {
      data.fisio = this.fisio;
    }
    this.empleadoService.listarPorPP(data).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
