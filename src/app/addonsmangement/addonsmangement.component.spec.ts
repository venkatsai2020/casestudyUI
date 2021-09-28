import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { routingComponents } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';

import { AddonsmangementComponent } from './addonsmangement.component';

describe('AddonsmangementComponent', () => {
  let component: AddonsmangementComponent;
  let fixture: ComponentFixture<AddonsmangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonsmangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonsmangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
