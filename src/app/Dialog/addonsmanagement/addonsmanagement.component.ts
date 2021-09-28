import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/adminservice.service';


@Component({
  selector: 'app-addonsmanagement',
  templateUrl: './addonsmanagement.component.html',
  styleUrls: ['./addonsmanagement.component.scss']
})
export class AddonsmanagementComponent implements OnInit {
  nameerror: any;
  statuserror: any;
  costerror: any;

  constructor(private fb:FormBuilder,private adminserivce:AdminserviceService,private matref:MatDialogRef<AddonsmanagementComponent>,private router:Router) { }

  ngOnInit(): void {
  }

  addonsmanagement=this.fb.group({
    name:[''],
    cost:[''],
    status:['']
  });

  onsubmit(){
    console.log(this.addonsmanagement.value);
    this.adminserivce.post_addonmangement(this.addonsmanagement.value)
    .subscribe(data=>{
      console.log(data);
      this.matref.close([]);
    }, err=>{
      console.log(err.error);
        if(err instanceof  HttpErrorResponse){
          if(err.status=== 500){
            this.router.navigate(['home']);
            this.matref.close();
          }
     this.nameerror=err.error.name;
      this.costerror=err.error.cost;
      this.statuserror= err.error.status;
      }
    });
  }
}
