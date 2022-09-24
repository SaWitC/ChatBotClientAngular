import { TestBed } from '@angular/core/testing';

import { NotifySignalRService } from './notify-signal-r.service';

describe('NotifySignalRService', () => {
  let service: NotifySignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifySignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
