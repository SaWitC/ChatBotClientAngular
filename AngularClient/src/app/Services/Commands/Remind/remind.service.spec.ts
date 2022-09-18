import { TestBed } from '@angular/core/testing';

import { RemindCustomService } from './remind.service';

describe('RemindCustomService', () => {
  let service: RemindCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemindCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
