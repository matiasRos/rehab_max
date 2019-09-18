import { Component, OnInit } from '@angular/core';
import { RegistrarService } from '../../../services/registrar.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  closeResult: string;
  constructor(private service: RegistrarService, private modalService: NgbModal) { }
  services: any = [];
  observacion: String = "";
  ngOnInit() {
    this.getServicios();
  }


  getServicios() {
    this.service.listarServicios().subscribe((response) => {
      this.services = response['lista'];
      console.log(this.services);
    });
  }

  registrarServicio() {
    var data = {
      observacion: this.observacion, 
      idFichaClinica: 68
    };
    this.service.crearServicio(data).subscribe((response) => {
      this.getServicios();
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
