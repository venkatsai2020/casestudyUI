import { Component, OnInit } from '@angular/core';
import { WasherserviceService } from '../washerservice.service';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../Dialog/mat-confirm-dialog/mat-confirm-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode"

@Component({
  selector: 'app-scheduledorders',
  templateUrl: './scheduledorders.component.html',
  styleUrls: ['./scheduledorders.component.scss']
})
export class ScheduledordersComponent implements OnInit {
  public ELEMENT_DATA=[];
  i:any;
  displayedColumns: string[] = ['position','status', 'package','addons','date', 'button'];
  public dataSource=[];
  decoded: any;
  washtoken: any;
  constructor(private _washerservice: WasherserviceService,public dialog: MatDialog,private cookie:CookieService) { }

  ngOnInit(): void {


    this.washtoken=this.cookie.get('washjwt');
    console.log(this.washtoken);
    this.decoded = jwt_decode(this.washtoken);
    console.log(this.decoded.id);

    this.i=0;
    this._washerservice.get_washer_scheduleorders(this.decoded.id)
    .subscribe(data => {this.ELEMENT_DATA=data
      this.ELEMENT_DATA.forEach((a:any)=>{
        this.i=this.i+1;
        a.position=this.i;
      })
      this.dataSource = this.ELEMENT_DATA;});
  }

  acceptedOrders(data:any){
    let dialogRef=this.dialog.open(MatConfirmDialogComponent,{width:'25%'}); //dialog for confirmation...
    dialogRef.afterClosed().subscribe(result=>{
      if(result=="true"){
   this._washerservice.delete_scheduleorders(data._id) //for delete the selected order from order_db...
    .subscribe((res)=> {console.log(res);
     this._washerservice.AcceptedOrders(res)//for storing the deleted order in the washe_order_db.....
     .subscribe((res=>{console.log(res)}));
      this.ngOnInit();}); //for display the order in order data base..*/
    }
  })
}



}
