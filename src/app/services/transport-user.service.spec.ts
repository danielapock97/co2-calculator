import { TestBed } from '@angular/core/testing';

import { TransportUserService } from './transport-user.service';

describe('TransportUserService', () => {
  let service: TransportUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
