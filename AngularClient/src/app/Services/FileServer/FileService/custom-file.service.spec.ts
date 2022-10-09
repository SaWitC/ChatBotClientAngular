import { TestBed } from '@angular/core/testing';

import { CustomFileService } from './custom-file.service';

describe('CustomFileService', () => {
  let service: CustomFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
