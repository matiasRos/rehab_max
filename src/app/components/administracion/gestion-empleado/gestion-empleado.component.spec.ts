import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmpleadoComponent } from './gestion-empleado.component';

describe('GestionEmpleadoComponent', () => {
  let component: GestionEmpleadoComponent;
  let fixture: ComponentFixture<GestionEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
