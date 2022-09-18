import { TestBed } from '@angular/core/testing';

import { CustomMessagesService } from './custom-messages.service';

describe('CustomMessagesService', () => {
  let service: CustomMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
