import { Component, OnInit } from '@angular/core';
import { WasherserviceService } from '../washerservice.service';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../Dialog/mat-confirm-dialog/mat-confirm-dialog.component';
import { CancleDialogComponent } from '../Dialog/cancle-dialog/cancle-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode"
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-washrequest',
  templateUrl: './washrequest.component.html',
  styleUrls: ['./washrequest.component.scss']
})
export class WashrequestComponent implements OnInit {

  public ELEMENT_DATA=[];
  i:any;
  washertoken: any;
  decoded: any;
  constructor(private _washerservice: WasherserviceService,public dialog: MatDialog,private cookie:CookieService,private router:Router) { }
  displayedColumns: string[] = ['position','status', 'package','addons','date', 'accept', 'cancle'];
  public dataSource=[];
  ngOnInit(): void { //defalut call to service after the component loaded...

     
    this.washertoken=this.cookie.get('washjwt');
    console.log(this.washertoken);
    this.decoded = jwt_decode(this.washertoken);
    console.log(this.decoded.id);

    this.i=0;
    this._washerservice.getOrders_washer(this.decoded.id)
    .subscribe(data => {this.ELEMENT_DATA=data
      this.ELEMENT_DATA.forEach((a:any)=>{
        this.i=this.i+1;
        a.position=this.i;
        console.log(a);
      })
      this.dataSource = this.ELEMENT_DATA;});
  }

  //delete orders form order_db and store it in the washer_order db...
  acceptedOrders(data:any){
      let dialogRef=this.dialog.open(MatConfirmDialogComponent,{width:'25%'}); //dialog for confirmation...
      dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
     this._washerservice.workerAcceptedOrders(data._id) //for delete the selected order from order_db...
      .subscribe((res)=> {console.log(res);
       this._washerservice.AcceptedOrders(res)//for storing the deleted order in the washe_order_db.....
       .subscribe(res=>{console.log(res),
        this.ngOnInit();},
       err=>{
        console.log(err);
        if(err instanceof  HttpErrorResponse){
          if(err.status=== 500){
            this.router.navigate(['home']);
          }
        }
      });
        },
        err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
        }); //for display the order in order data base..*/
      }
    })
  }

  cancleOrders(data:any){
   let dialogRef=this.dialog.open(CancleDialogComponent,{width:'25%'}); //dialog for confirmation...
    dialogRef.afterClosed().subscribe(result=>{
      if(result=="true"){
        this._washerservice.workerAcceptedOrders(data._id) //for delete the selected order from order_db...
      .subscribe((res)=> {console.log(res);
        this._washerservice.post_cancled_orders(res)
        .subscribe((res)=>{console.log(res);
        this.ngOnInit();},
        err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
        }
        )},
        err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
        });
        }
      });
    } 
}

