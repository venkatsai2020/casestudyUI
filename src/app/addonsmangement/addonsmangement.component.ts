import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { AddonsmanagementComponent } from '../Dialog/addonsmanagement/addonsmanagement.component';
import { UpdateaddonsmanagementComponent } from '../Dialog/updateaddonsmanagement/updateaddonsmanagement.component';

@Component({
  selector: 'app-addonsmangement',
  templateUrl: './addonsmangement.component.html',
  styleUrls: ['./addonsmangement.component.scss']
})
export class AddonsmangementComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'cost','status', 'delete','update'];
  dataSource:any;
  ELEMENT_DATA: any;
  i:any;
  constructor(public dialog: MatDialog,private adminservic:AdminserviceService,private router:Router) { }

  ngOnInit(): void {
    this.i=0;
    this.adminservic.get_addonmangement()
    .subscribe(data=>{
      this.ELEMENT_DATA=data
        this.ELEMENT_DATA.forEach((a:any)=>{
          this.i=this.i+1;
          a.position=this.i;
        })
        this.dataSource = this.ELEMENT_DATA;},
        err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
        });
  }

  create(){
    let dialogRef=this.dialog.open(AddonsmanagementComponent,{width:'25%'})
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    },
    );
  }

  delete(ref:any){
    console.log(ref);
  this.adminservic.delete_addonmangement(ref._id)
  .subscribe(data=>{
    console.log(data);
    this.ngOnInit();
  }, err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
          });

  }
  update(ref:any){
    console.log(ref);
    let dialogRef=this.dialog.open(UpdateaddonsmanagementComponent,{width:'25%',data:{
      id:ref._id,
      name:ref.name,
      cost:ref.cost,
      position:ref.position,
      status:ref.status
    }})
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    });
  }
}
