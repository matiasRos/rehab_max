import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { NgxPaginationModule } from "ngx-pagination";
import { ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { HeaderBgComponent } from "./components/common/header-bg/header-bg.component";
import { ExportAsModule } from 'ngx-export-as';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxMaterialTimepickerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ExportAsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HeaderBgComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
