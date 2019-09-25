import { Component, OnInit, ViewChild } from "@angular/core";
import { EmpleadosService } from "src/app/services/empleados.service";
import { RegistrarService } from "src/app/services/registrar.service";
import { Paciente } from "src/app/models/paciente";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

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
  idPP: any;
  idPP2: any;
  idCom: any;
  idCom2: any;
  comision: any;
  emp: any;
  emp2: any;
  editCom: any;
  errormostrar: any;
  dataSource: any = [];
  closeResult: string;

  displayedColumns: string[] = [
    "fechaHora",
    "empleado",
    "local",
    "porcentaje",
    "presentacion_producto",
    "acciones"
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private empleadoService: EmpleadosService,
    private registrarService: RegistrarService,
    private modalService: NgbModal
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

  crearComision(refmodal) {
    let data = {
      idPresentacionProducto: this.idPP,
      idEmpleado: null,
      comision: this.comision
    };
    if (this.emp) {
      data.idEmpleado = this.emp;
    }
    this.empleadoService.crearComision(data).subscribe(result => {
      console.log("result", result);
      if (result.error) {
        this.errormostrar = true;
        this.crearModal(refmodal);
      } else {
        this.comisiones = [];
        this.listarComisiones();
      }
    });
  }

  modificarComision(c) {
    console.log(c);
    let data = {
      idComision: c.idComisionEmpleado,
      idPresentacionProducto: c.idPresentacionProducto.idPresentacionProducto,
      idEmpleado: null,
      comision: c.porcentajeComision
    };
    if (this.emp2) {
      data.idEmpleado = this.emp2;
    }
    this.empleadoService.modifComision(data).subscribe(result => {
      if (result.error) {
        this.errormostrar = true;
      } else {
        this.comisiones = [];
        this.listarComisiones();
      }
    });
  }

  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.crearComision(content);
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

  crearModal1(content, c) {
    this.editCom = c;
    console.log(this.editCom);
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.modificarComision(c);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
        }
      );
  }

  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
