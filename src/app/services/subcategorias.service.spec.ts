import { TestBed } from '@angular/core/testing';

import { SubcategoriasService } from './subcategorias.service';

describe('SubcategoriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubcategoriasService = TestBed.get(SubcategoriasService);
    expect(service).toBeTruthy();
  });
});
