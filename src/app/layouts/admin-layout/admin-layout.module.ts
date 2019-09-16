import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { CategoriasComponent } from "src/app/components/administracion/categorias/categorias.component";
import { SubcategoriasComponent } from "src/app/components/administracion/subcategorias/subcategorias.component";
import { VerSubcategoriasComponent } from "src/app/components/administracion/ver-subcategorias/ver-subcategorias.component";
import { PacientesComponent } from "src/app/components/administracion/pacientes/pacientes.component";
import { EmpleadosComponent } from "src/app/components/administracion/empleados/empleados.component";
import { GestionEmpleadoComponent } from "src/app/components/administracion/gestion-empleado/gestion-empleado.component";
import { CardsComponent } from "src/app/pages/cards/cards.component";
import { ServiciosComponent } from "src/app/components/administracion/servicios/servicios.component";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CategoriasComponent,
    SubcategoriasComponent,
    VerSubcategoriasComponent,
    PacientesComponent,
    EmpleadosComponent,
    GestionEmpleadoComponent,
    CardsComponent,
    ServiciosComponent
  ]
})
export class AdminLayoutModule {}
