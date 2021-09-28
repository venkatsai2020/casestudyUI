import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { AdmincareatewasherComponent } from './admincareatewasher.component';

describe('AdmincareatewasherComponent', () => {
  let component: AdmincareatewasherComponent;
  let fixture: ComponentFixture<AdmincareatewasherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincareatewasherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincareatewasherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
