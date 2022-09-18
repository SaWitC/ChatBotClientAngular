import { TestBed } from '@angular/core/testing';

import { CustomChatService } from './custom-chat.service';

describe('CustomChatService', () => {
  let service: CustomChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
