import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WasherserviceService } from './washerservice.service';

describe('WasherserviceService', () => {
  let service: WasherserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(WasherserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
