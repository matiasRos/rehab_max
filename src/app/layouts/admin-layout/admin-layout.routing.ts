import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { CategoriasComponent } from "src/app/components/administracion/categorias/categorias.component";
import { SubcategoriasComponent } from "src/app/components/administracion/subcategorias/subcategorias.component";
import { VerSubcategoriasComponent } from "src/app/components/administracion/ver-subcategorias/ver-subcategorias.component";
import { PacientesComponent } from "src/app/components/administracion/pacientes/pacientes.component";
import { EmpleadosComponent } from "src/app/components/administracion/empleados/empleados.component";
import { GestionEmpleadoComponent } from "src/app/components/administracion/gestion-empleado/gestion-empleado.component";
import { ServiciosComponent } from "src/app/components/administracion/servicios/servicios.component";
import { RegistrarComponent } from '../../components/administracion/registrar/registrar.component';
import { RegistrarDetalladoComponent } from "src/app/components/administracion/registrar-detallado/registrar-detallado.component";


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "categorias", component: CategoriasComponent },
  { path: "servicios", component: ServiciosComponent },
  { path: "pacientes", component: PacientesComponent },
  { path: "empleados", component: EmpleadosComponent },
  { path: "empleados/:id/gestionar", component: GestionEmpleadoComponent },
  { path: "subcategorias", component: SubcategoriasComponent },
  { path: "subcategorias/:id/ver", component: VerSubcategoriasComponent },
  { path: "registro", component: RegistrarComponent },
  { path: "servicios-detallado", component: RegistrarDetalladoComponent }
];
