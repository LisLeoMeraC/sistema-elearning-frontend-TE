import { TestBed } from '@angular/core/testing';

import { RecursosSharedService } from './recursos-shared.service';

describe('RecursosSharedService', () => {
  let service: RecursosSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursosSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
