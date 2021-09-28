import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/adminservice.service';

@Component({
  selector: 'app-updateaddonsmanagement',
  templateUrl: './updateaddonsmanagement.component.html',
  styleUrls: ['./updateaddonsmanagement.component.scss']
})
export class UpdateaddonsmanagementComponent implements OnInit {
  ref: any;
  addonmanagement: any;
  nameerror: any;
  costerror: any;
  statuserror: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb:FormBuilder,private adminserivce:AdminserviceService,private matref:MatDialogRef<UpdateaddonsmanagementComponent>,private router:Router) { }

  ngOnInit(): void {

    console.log(this.data);
    this.ref=this.data;
    this.addonmanagement=this.fb.group({
      name:[this.ref.name],
      cost:[this.ref.cost],
      status:[this.ref.status],
      id:[this.ref.id],
      position:[this.ref.position]
    });
  }

  onupdate(){
    console.log(this.addonmanagement.value);
    this.adminserivce.put_addonmangement(this.addonmanagement.value)
    .subscribe(data=>{
      console.log(data);
      this.matref.close([]);
    },err=>{
      if(err instanceof  HttpErrorResponse){
        if(err.status=== 500){
          this.router.navigate(['home']);
          this.matref.close();
        }
      console.log(err.error);
      this.nameerror=err.error.name;
       this.costerror=err.error.cost;
       this.statuserror= err.error.status;
      }
    });
  }
}
