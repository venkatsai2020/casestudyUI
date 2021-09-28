import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminserviceService } from 'src/app/adminservice.service'
import { MatDialogRef } from '@angular/material/dialog';
import { CarmanagementComponent } from 'src/app/carmanagement/carmanagement.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carmanagement-dialog',
  templateUrl: './carmanagement-dialog.component.html',
  styleUrls: ['./carmanagement-dialog.component.scss']
})
export class CarmanagementDialogComponent implements OnInit {

  constructor(private fb:FormBuilder,private adminserivce:AdminserviceService,private matref:MatDialogRef<CarmanagementComponent>,private router:Router) { }
  carmodelerror:any="";
  carnameerror:any="";
  statuserror:any="";
  carmanagement=this.fb.group({
    carname:['',Validators.required],
    carmodel:['',Validators.required],
    status:['',Validators.required]
  });

  ngOnInit(): void {
  }

  onsubmit(){
    console.log(this.carmanagement.value);
    this.adminserivce.post_carmangement(this.carmanagement.value)
    .subscribe(data=>{
      console.log(data);
      this.matref.close([]);
    }, err=>{
      if(err instanceof  HttpErrorResponse){
        if(err.status=== 500){
          this.router.navigate(['home']);
          this.matref.close();
        }
      console.log(err.error);
     this.carmodelerror=err.error.carmodel;
      this.carnameerror=err.error.carname;
      this.statuserror= err.error.status;
      }
    });
  }

}
