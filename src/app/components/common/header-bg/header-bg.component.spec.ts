import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBgComponent } from './header-bg.component';

describe('HeaderBgComponent', () => {
  let component: HeaderBgComponent;
  let fixture: ComponentFixture<HeaderBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
