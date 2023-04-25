import { TestBed } from '@angular/core/testing';

import { UserTransportService } from './user-transport.service';

describe('TransportUserService', () => {
  let service: UserTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
