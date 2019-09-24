import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: ""
  },
  {
    path: "/registro",
    title: "Registrar",
    icon: "ni-tv-2 text-primary",
    class: ""
  },
  {
    path: "/categorias",
    title: "Categorias",
    icon: "ni-planet text-blue",
    class: ""
  },
  {
    path: "/servicios",
    title: "Servicios",
    icon: "ni-planet text-blue",
    class: ""
  },
  {
    path: "/servicios-detallado",
    title: "Servicios Detallados",
    icon: "ni-planet text-blue",
    class: ""
  },
  {
    path: "/pacientes",
    title: "Pacientes",
    icon: "ni-single-02 text-blue",
    class: ""
  },
  {
    path: "/empleados",
    title: "Empleados",
    icon: "ni-circle-08 text-blue",
    class: ""
  },
  {
    path: "/comisiones",
    title: "Comisiones",
    icon: "ni-money-coins text-blue",
    class: ""
  },
  { path: "/icons", title: "Iconos", icon: "ni-planet text-blue", class: "" },
  { path: "/maps", title: "Mapas", icon: "ni-pin-3 text-orange", class: "" },
  {
    path: "/user-profile",
    title: "Formulario",
    icon: "ni-single-02 text-yellow",
    class: ""
  },
  {
    path: "/tables",
    title: "Tablas",
    icon: "ni-bullet-list-67 text-red",
    class: ""
  },
  { path: "/login", title: "Login", icon: "ni-key-25 text-info", class: "" }
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }
}
