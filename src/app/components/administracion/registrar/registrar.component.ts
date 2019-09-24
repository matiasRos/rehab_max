import { Component, OnInit } from "@angular/core";
import { RegistrarService } from "../../../services/registrar.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { PacientesService } from '../../../services/pacientes.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { EmpleadosService } from "src/app/services/empleados.service";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-registrar",
  templateUrl: "./registrar.component.html",
  styleUrls: ["./registrar.component.scss"]
})
export class RegistrarComponent implements OnInit {
  form: FormGroup;
  presentacionProducto: any = [];
  idPre: any;
  idSer: any;
  detallesCabeceraServicio: any;
  estado: any;
  presupuesto: any;
  motivoConsulta: any;
  descripcionGeneral: any;
  dataSource: any = [];
  urlFiltro: String = "";
  constructor(private exportAsService: ExportAsService,private empleadoService: EmpleadosService,private service: RegistrarService, private modalService: NgbModal, private fb: FormBuilder,
    private pacienteService: PacientesService) { }
  filter: any = {};
  closeResult: string;
  services: any = [];
  observacion: string = "";
  fechaDesde: String;
  fechaHasta: String;
  idPersona: any;
  pacientes: any = [];
  empleados:any=[];
  exportAsConfig: ExportAsConfig;
  displayedColumns: string[] = [
    "id",
    "fisioterapeuta",
    "cliente",
    "presupuesto",
    "subcategoria",
    "fechaHora",
    "opciones"
  ];

  exportPDF() {
    this.exportAsConfig={
      type: 'pdf', // the type you want to download
      elementId: 'table-registrar-pdf', // the id of html/table element
      options: { // html-docx-js document options
        orientation: 'landscape',
        margins: {
          top: '2000',
          left:'2000',
          bottom: '2000'
        }
      }
    }
    // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig, 'Servicios').subscribe(() => {
      // save started
    });
   
  }

  exportCSV() {
    this.exportAsConfig={
      type: 'xlsx', // the type you want to download
      elementId: 'table-registrar-xlsx', // the id of html/table element
      options: { // html-docx-js document options
        orientation: 'landscape',
        margins: {
          top: '2000',
          bottom: '2000'
        }
      }
    }
    // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig, 'Servicios').subscribe(() => {
      // save started
    });
   
  }
  submit() {
    console.log(this.form.value);
  }

  getValues() {
    return this.presentacionProducto;
  }

  ngOnInit() {
    this.getServicios();
    this.getPresentacionProducto();
    this.getPacientes();
    this.listarEmpleados();
  }
  getPacientes() {
    this.pacientes = [];
    this.pacienteService.listarPacientes('').subscribe(result => {
      console.log(result['lista']);
      this.pacientes = result['lista'];
    });
  }

  getPresentacionProducto() {
    this.presentacionProducto = [];
    this.service.listarPresentacionProducto().subscribe(result => {
      result.lista.forEach(a => {
        var elem = {
          idPresentacionProducto: a.idPresentacionProducto,
          descripcion: a.descripcion
        };
        this.presentacionProducto.push(elem);
      });
    });
  }

  getServicios() {
    this.services = [];
    this.service.listarServicios().subscribe(result => {
     if(result.lista){
        this.dataSource = new MatTableDataSource(result.lista);
        this.services= [... result.lista]
     }   
    });
  }
  listarEmpleados() {
    this.empleados = [];
    this.empleadoService.listarEmpleados().subscribe(result => {
      if (result) {
        this.empleados = [...result.lista];
      }
    });
  }
  limpiar(){
    this.fechaDesde="";
    this.fechaHasta="";
    this.getServicios();
  }
  addFilter() {
    var data = {};
    if (this.fechaDesde) {
      data["fechaDesdeCadena"] = this.getDatesToS(this.fechaDesde);
    }
    if (this.fechaHasta) {
      data["fechaHastaCadena"] = this.getDatesToS(this.fechaHasta);
    }
    if (this.filter.cliente && this.filter.cliente!=0) {
      data["idFichaClinica"] = {};
      data["idFichaClinica"]["idCliente"]={}
      data["idFichaClinica"]["idCliente"]["idPersona"]=this.filter.cliente;
    }
    if (this.filter.empleado && this.filter.empleado!=0) {
      data["idEmpleado"] = {};
      data["idEmpleado"]["idPersona"]= +this.filter.empleado;
    }
    this.urlFiltro = "?ejemplo=" + JSON.stringify(data);
    this.filtrar();
  }

  filtrar() {

    this.services = [];
    this.service.obtenerServiciosPorRangoFechas(this.urlFiltro).subscribe(result => {
      this.services = [];
      if (result) {
        if(result.lista){
          this.dataSource = new MatTableDataSource(result.lista);
          this.services= [... result.lista];
       }
      }
    });
  }

  getDatesToS(fecha) {
    return fecha.replace(/-/g, '');
  }

  getCabeceraServicios(idServicio) {
    this.service.listarServicioPorIdServicioCabecera(idServicio).subscribe((response) => {
      //this.detallesCabeceraServicio = response;
      console.log(response);
      console.log('detallesCabeceraServicio', this.detallesCabeceraServicio);
      this.estado = response.estado;
      this.observacion = response.observacion;
      this.presupuesto = response.presupuesto;

    });
  }

  getDetallesPorIdServicio(idServicio) {
    this.service.listarServicioPorIdServicioDetalle(idServicio).subscribe((response) => {
      console.log(response);
      if (response.length === 0) {
        console.log('response vacio');
        return;
      }
      console.log(response[0]);
      this.idSer = response[0].idServicio.idServicio;
      this.motivoConsulta = response[0].idServicio.idFichaClinica.motivoConsulta;
      this.descripcionGeneral = response[0].idPresentacionProducto.descripcionGeneral;
    });
  }
  obtenerServiciosRegistradosPorFisioterapeuta(idServicio) {
    this.service
      .obtenerServiciosRegistradosPorFisioterapeuta(idServicio)
      .subscribe(response => {
        console.log(response);
      });
  }

  listarObtenerServiciosPorPaciente(idPaciente) {
    this.service
      .listarObtenerServiciosPorPaciente(idPaciente)
      .subscribe(response => {
        console.log(response);
      });
  }
  obtenerServiciosRealizadosPorFecha(fechaDesde, fechaHasta) {
    this.service
      .obtenerServiciosRealizadosPorFecha(fechaDesde, fechaHasta)
      .subscribe(response => {
        console.log(response);
      });
  }
  deleteUnServicio(idServicio, idDetalle) {
    this.service.deleteUnServicio(idServicio, idDetalle).subscribe(response => {
      console.log(response);
    });
  }

  registrarServicio() {
    console.log(this.idSer, this.idPre);

    let data = {
      observacion: this.observacion,
      idFichaClinica: 68
    };
    this.service.crearServicio(data).subscribe(response => {
      this.getServicios();
    });
  }

  agregarDetalleAServicio(idServicio, idPresentacionProducto, cantidad) {
    this.service
      .agregarDetallesAServicio(idServicio, idPresentacionProducto, cantidad)
      .subscribe(response => {
        console.log(response);
      });
  }

  crearModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.registrarServicio();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  eliminarUnServicioParcial(idServicio) {
    this.service
      .listarServicioPorIdServicioDetalle(idServicio)
      .subscribe(response => {
        console.log("response eliminarUnServicioParcial", response);
        if (response.length === 0) {
          console.log('response vacio');
          this.getServicios();
          return;
        } else {
          var idDetalleServicio = response[0].idServicioDetalle;

          this.deleteUnServicio(idServicio, idDetalleServicio);
        }
      });
  }
  crearModalAgregarDetalleAServicio(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-agregar-detalle-a-servicio" })
      .result.then(
        result => {
          this.agregarDetalleAServicio(this.idSer, this.idPre, 1);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  crearModalDetallesDeServicio(content, idServicio) {
    this.verDetallesServicio(idServicio);
    this.modalService
      .open(content, { ariaLabelledBy: 'detalles-del-servicio' })
      .result.then(
        result => {
          console.log('Clg crearModalDetallesServicio');
          // this.verDetallesServicio(idServicio);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  crearModalDetallesPorCliente(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-servicios-por-cliente' })
      .result.then(
        result => {
          console.log('Clg crearModalDetallesServicio');
          console.log('idPersona', this.idPersona);
          this.services = [];
          this.service.listarObtenerServiciosPorPaciente(this.idPersona).subscribe((result) => {
            console.log('result', result);
            if (result) {
              result.lista.forEach(a => {
                const elem = {
                  idServicio: a.idServicio,
                  usuario: a.usuario.usuarioLogin,
                  observacion: a.observacion,
                  presupuesto: a.presupuesto
                };
                this.services.push(elem);
              });
            }
          });
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }


  crearModalDetallesServicioDetallado(content, idServicio) {
    this.getDetallesPorIdServicio(idServicio);
    console.log(idServicio);
    this.modalService
      .open(content, { ariaLabelledBy: 'detalles-del-servicio-detallado' })
      .result.then(
        result => {
          console.log('Clg crearModalDetallesServicioDetallado');

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

  verDetallesServicio(idServicio) {
    this.idSer = idServicio;
    this.getCabeceraServicios(idServicio);
  }
}
