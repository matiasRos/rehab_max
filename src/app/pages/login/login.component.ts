import {Component, OnInit, OnDestroy} from '@angular/core';
import {Paciente} from 'src/app/models/paciente';
import {PacientesService} from '../../services/pacientes.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    usuario = '';
    password = '';
    pacientes: any = [];
    loading: boolean;
    descripcion = '';
    nombre = '';
    apellido = '' +
        '';
    email = '';
    telefono = '';
    ruc = '';
    cedula = '';
    tipoPersona = '';
    fechaNacimiento: Date;
    filter: any = {};
    index = 0;
    modalUsu: boolean;
    closeResult: string;


    constructor(
        private pacienteService: PacientesService,
        public router: Router,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.listar();
    }

    ngOnDestroy() {
    }

    listar() {
        this.loading = true;
        this.pacientes = [];
        this.pacienteService.listarPacientesAutorizados().subscribe(result => {
            this.loading = false;
            result.lista.forEach(a => {
                this.pacientes.push(new Paciente(a));
            });
        });
        console.log(this.pacientes);
    }

    ingresar(usuario) {
        let bandera = 0;
        console.log('Nooooooo');
        this.pacientes.forEach(function (element) {
            if (usuario === element.email && usuario !== '') {
                console.log(usuario);
                bandera = 1;
            }
        });
        if (bandera === 1) {
            const url = '/dashboard';
            this.router.navigate([url, {}]);
        } else {
            console.log('Youuuuu... Shall nooot... Paaaasss');
            this.modalUsu = true;
            /*const url = '/login';
            this.router.navigate([url, {}]);*/
        }
    }

}
