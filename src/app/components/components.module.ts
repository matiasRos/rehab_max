import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./common/sidebar/sidebar.component";
import { NavbarComponent } from "./common/navbar/navbar.component";
import { FooterComponent } from "./common/footer/footer.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FichasComponent } from './administracion/fichas/fichas.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, FichasComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent]
})
export class ComponentsModule {}
