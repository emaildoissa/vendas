import { TestBed } from '@angular/core/testing';

import { CalculoPrecoService } from './calculo-preco.service';

describe('CalculoPrecoService', () => {
  let service: CalculoPrecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculoPrecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
