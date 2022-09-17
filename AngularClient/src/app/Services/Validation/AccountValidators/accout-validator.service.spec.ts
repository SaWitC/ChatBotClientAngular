import { TestBed } from '@angular/core/testing';

import { AccoutValidatorService } from './accout-validator.service';

describe('AccoutValidatorService', () => {
  let service: AccoutValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccoutValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
