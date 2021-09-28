import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/adminservice.service';
import { PlanesmanagementComponent } from 'src/app/planesmanagement/planesmanagement.component';

@Component({
  selector: 'app-planmanagementdialog',
  templateUrl: './planmanagementdialog.component.html',
  styleUrls: ['./planmanagementdialog.component.scss']
})
export class PlanmanagementdialogComponent implements OnInit {
  nameerror: any;
  statuserror: any;
  costerror: any;

  constructor(private fb:FormBuilder,private adminserivce:AdminserviceService,private matref:MatDialogRef<PlanesmanagementComponent>,private router:Router) { }

  ngOnInit(): void {
  }
  planmanagement=this.fb.group({
    name:[''],
    cost:[''],
    status:['']
  });

  onsubmit(){
    console.log(this.planmanagement.value);
    this.adminserivce.post_planmangement(this.planmanagement.value)
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
     this.nameerror=err.error.name;
      this.costerror=err.error.cost;
      this.statuserror= err.error.status;
      }
    });
  }
}
