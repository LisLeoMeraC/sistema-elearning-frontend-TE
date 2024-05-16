import { TestBed } from '@angular/core/testing';

import { PreguntaEliminadaService } from './pregunta-eliminada.service';

describe('PreguntaEliminadaService', () => {
  let service: PreguntaEliminadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntaEliminadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
