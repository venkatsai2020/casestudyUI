import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdmintokenInterceptorService } from './admintoken-interceptor.service';

describe('AdmintokenInterceptorService', () => {
  let service: AdmintokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(AdmintokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
