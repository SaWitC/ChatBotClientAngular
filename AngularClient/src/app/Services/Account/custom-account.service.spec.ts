import { TestBed } from '@angular/core/testing';

import { CustomAccountService } from './custom-account.service';

describe('CustomAccountService', () => {
  let service: CustomAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
