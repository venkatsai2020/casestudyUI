import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminserviceService } from 'src/app/adminservice.service'
import { MatDialogRef } from '@angular/material/dialog';
import { CarmanagementComponent } from 'src/app/carmanagement/carmanagement.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-updatecarmanagement-dialog',
  templateUrl: './updatecarmanagement-dialog.component.html',
  styleUrls: ['./updatecarmanagement-dialog.component.scss']
})
export class UpdatecarmanagementDialogComponent implements OnInit {

  ref:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb:FormBuilder,private adminserivce:AdminserviceService,private matref:MatDialogRef<CarmanagementComponent>,private router:Router) { }
  carmodelerror:any="";
  carnameerror:any="";
  statuserror:any="";
  carmanagement:any;

  ngOnInit(): void {
    console.log(this.data);
    this.ref=this.data;
    this.carmanagement=this.fb.group({
      carname:[this.ref.carname,Validators.required],
      carmodel:[this.ref.carmodel,Validators.required],
      status:[this.ref.status,Validators.required],
      id:[this.ref.id],
      position:[this.ref.position]
    });

  }

  onupdate(){
    console.log(this.carmanagement.value);
    this.adminserivce.put_carmangement(this.carmanagement.value)
    .subscribe(data=>{
      console.log(data);
      this.matref.close([]);
    },err=>{
        console.log(err);
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
