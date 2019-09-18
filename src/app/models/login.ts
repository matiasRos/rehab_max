export class Login {
    usuario: string;
    password: string;

    constructor(data) {
        this.usuario = data.usuario;
        this.password = data.password;
    }
}
