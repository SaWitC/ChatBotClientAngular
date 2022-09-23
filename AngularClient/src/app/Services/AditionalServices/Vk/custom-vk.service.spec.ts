import { TestBed } from '@angular/core/testing';

import { CustomVkService } from './custom-vk.service';

describe('CustomVkService', () => {
  let service: CustomVkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomVkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
