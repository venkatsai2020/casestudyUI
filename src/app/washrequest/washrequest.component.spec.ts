import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';

import { WashrequestComponent } from './washrequest.component';

describe('WashrequestComponent', () => {
  let component: WashrequestComponent;
  let fixture: ComponentFixture<WashrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WashrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WashrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
