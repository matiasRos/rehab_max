import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSubcategoriasComponent } from './ver-subcategorias.component';

describe('VerSubcategoriasComponent', () => {
  let component: VerSubcategoriasComponent;
  let fixture: ComponentFixture<VerSubcategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSubcategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
