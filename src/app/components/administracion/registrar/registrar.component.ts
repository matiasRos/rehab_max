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
  constructor(private service: RegistrarService, private modalService: NgbModal, private fb: FormBuilder,
    private pacienteService: PacientesService) { }
  filter: any = {};
  closeResult: string;
  services: any = [];
  observacion: string = "";
  fechaDesde: Date;
  fechaHasta: Date;
  idPersona: any;
  pacientes: any = [];

  submit() {
    console.log(this.form.value);
  }

  getValues() {
    return this.presentacionProducto;
  }

  ngOnInit() {
    this.getServicios();
    this.getPresentacionProducto();
    this.getServicios();
    this.getPacientes();
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
      result.lista.forEach(a => {
        var elem = {
          idServicio: a.idServicio,
          usuario: a.usuario.usuarioLogin,
          observacion: a.observacion,
          presupuesto: a.presupuesto
        };
        this.services.push(elem);
      });
    });
  }

  filtrar() {

    this.services = [];
    this.service.obtenerServiciosPorRangoFechas(this.getDatesToS(this.fechaDesde), this.getDatesToS(this.fechaHasta)).subscribe(result => {
      this.services = [];
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
