import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CutomerserviceService } from './cutomerservice.service';

describe('CutomerserviceService', () => {
  let service: CutomerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(CutomerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
