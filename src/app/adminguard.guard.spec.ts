import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdminguardGuard } from './adminguard.guard';
import { routingComponents } from './app-routing.module';

describe('AdminguardGuard', () => {
  let guard: AdminguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    guard = TestBed.inject(AdminguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
