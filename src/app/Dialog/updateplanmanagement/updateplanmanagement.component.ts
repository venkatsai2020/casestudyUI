import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/adminservice.service';


@Component({
  selector: 'app-updateplanmanagement',
  templateUrl: './updateplanmanagement.component.html',
  styleUrls: ['./updateplanmanagement.component.scss']
})
export class UpdateplanmanagementComponent implements OnInit {
  ref: any;
  planmanagement: any;
  nameerror: any;
  costerror: any;
  statuserror: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb:FormBuilder,private adminserivce:AdminserviceService,private matref:MatDialogRef<UpdateplanmanagementComponent>,private router:Router) { }

  ngOnInit(): void {
    console.log(this.data);
    this.ref=this.data;
    this.planmanagement=this.fb.group({
      name:[this.ref.name],
      cost:[this.ref.cost],
      status:[this.ref.status],
      id:[this.ref.id],
      position:[this.ref.position]
    });
  }

  onupdate(){
    console.log(this.planmanagement.value);
    this.adminserivce.put_planmangement(this.planmanagement.value)
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
