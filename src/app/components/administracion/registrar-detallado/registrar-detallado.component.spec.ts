import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDetalladoComponent } from './registrar-detallado.component';

describe('RegistrarDetalladoComponent', () => {
  let component: RegistrarDetalladoComponent;
  let fixture: ComponentFixture<RegistrarDetalladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarDetalladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDetalladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
