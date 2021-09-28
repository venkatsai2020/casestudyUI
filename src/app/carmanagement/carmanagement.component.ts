import { Component, OnInit } from '@angular/core';
import { CarmanagementDialogComponent } from '../Dialog/carmanagement-dialog/carmanagement-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminserviceService } from '../adminservice.service';
import { UpdatecarmanagementDialogComponent } from '../Dialog/updatecarmanagement-dialog/updatecarmanagement-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carmanagement',
  templateUrl: './carmanagement.component.html',
  styleUrls: ['./carmanagement.component.scss']
})
export class CarmanagementComponent implements OnInit {
i:any;
  constructor(public dialog: MatDialog,private adminservic:AdminserviceService,private router:Router) { }
  displayedColumns: string[] = ['position', 'carname', 'carmodel', 'status', 'delete','update'];
  dataSource:any;
  ELEMENT_DATA:any;
  ngOnInit(): void {
    this.i=0;
    this.adminservic.get_carmangement()
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
    let dialogRef=this.dialog.open(CarmanagementDialogComponent,{width:'25%'})
   dialogRef.afterClosed().subscribe(result=>{
     this.ngOnInit();
  });
}
 
delete(ref:any){
  console.log(ref);
  this.adminservic.delete_carmangement(ref._id)
  .subscribe(data=>{
    console.log(data);
    this.ngOnInit();
  },err=>{
    console.log(err);
    if(err instanceof  HttpErrorResponse){
      if(err.status=== 500){
        this.router.navigate(['home']);
      }
    }
  },
  );
}

update(ref:any){
  console.log(ref);
  let dialogRef=this.dialog.open(UpdatecarmanagementDialogComponent,{width:'25%',data:{
    id:ref._id,
    carname:ref.carname,
    carmodel:ref.carmodel,
    position:ref.position,
    status:ref.status
  }})
  dialogRef.afterClosed().subscribe(result=>{
    this.ngOnInit();
  });
}
}
