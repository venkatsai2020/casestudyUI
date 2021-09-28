import { Component, OnInit } from '@angular/core';
import { WasherserviceService } from '../washerservice.service';
import { MatDialog } from '@angular/material/dialog';
import { PrcessDialogComponent } from '../Dialog/prcess-dialog/prcess-dialog.component';
import { CompletedDialogComponent } from '../Dialog/completed-dialog/completed-dialog.component';
import { RestorDialogComponent } from '../Dialog/restor-dialog/restor-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode"
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss']
})
export class MyorderComponent implements OnInit {
  i:any;
  j:any;
  k:any;
  l:any;
  managerActive=true;
  washertoken: any;
  decoded: any;
  constructor(private _washerservice: WasherserviceService,public dialog: MatDialog,private cookie:CookieService,private router:Router) { }
  displayedColumns: string[] = ['position','status','custname','custaddress','custcarname','custmobile','package','addons','date','instruction', 'button'];
  displayedColumns_1:string[]=['position','status','custname','custaddress','custcarname','custmobile','package','addons','date','instruction'];
  public dataSource=[];
  public ELEMENT_DATA:any;
  dataSource_1:any;
  dataSource_2:any;
  dataSource_3:any;
  ngOnInit(): void {

    this.washertoken=this.cookie.get('washjwt');
    console.log(this.washertoken);
    this.decoded = jwt_decode(this.washertoken);
    console.log(this.decoded.id);


    this.i=0;
    this.j=0;
    this.k=0;
    this.l=0;
    //for accepted orders to display...
    this._washerservice.get_washer_Accepted_orders(this.decoded.id)
      .subscribe(data => {this.ELEMENT_DATA=data
        this.ELEMENT_DATA.forEach((a:any)=>{
          this.i=this.i+1;
          a.position=this.i;
        })
        this.dataSource = this.ELEMENT_DATA;});

        
      //for procssed orders to display......
     this._washerservice.get_washer_prcessing_orders(this.decoded.id)
      .subscribe(data => {this.ELEMENT_DATA=data
        this.ELEMENT_DATA.forEach((a:any)=>{
          this.j=this.j+1;
          a.position=this.j;
        })
        this.dataSource_1= this.ELEMENT_DATA;});

      //for completed orders to display....
     this._washerservice.get_washer_completed_orders(this.decoded.id)
      .subscribe(data => {this.ELEMENT_DATA=data
        this.ELEMENT_DATA.forEach((a:any)=>{
          this.k=this.k+1;
          a.position=this.k;
        })
        this.dataSource_2= this.ELEMENT_DATA;});

      //for cancled orders to display......
    this._washerservice.get_washer_cancled_orders(this.decoded.id)
      .subscribe(data => {this.ELEMENT_DATA=data
        this.ELEMENT_DATA.forEach((a:any)=>{
          this.l=this.l+1;
          a.position=this.l;
        })
        this.dataSource_3= this.ELEMENT_DATA;});
      }

  Toprocess(data:any)
  {
    let dialogRef=this.dialog.open(PrcessDialogComponent,{width:'25%'}); //dialog for confirmation...
      dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
    this._washerservice.delete_Accepted_orders(data._id) //for delete the selected order from accepted_db...
    .subscribe((res)=> {console.log(res);
      this._washerservice.post_processing_orders(res)
      .subscribe((res)=>{
        console.log(res);
        this.ngOnInit();}, err=>{
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
    });
   }});      
  }
  Tocompleted(data:any)
  {
    let dialogRef=this.dialog.open(CompletedDialogComponent,{width:'25%'}); //dialog for confirmation...
      dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
    console.log(data._id);
    this._washerservice.delete_processing_orders(data._id) //for delete the selected order from accepted_db...
    .subscribe((res)=> {console.log(res);
      this._washerservice.post_completesd_orders(res)
      .subscribe((res)=>{
        console.log(res);
        this.ngOnInit();}, err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
        }); 
        }, err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
        });
      }}); 
    }

    Torestore(data:any)
    {
     let dialogRef=this.dialog.open(RestorDialogComponent,{width:'25%'}); //dialog for confirmation...
      dialogRef.afterClosed().subscribe(result=>{
        if(result=="true"){
          
        this._washerservice.delete_cancled_orders(data._id) //for delete the selected order from accepted_db...
    .subscribe((res)=> {console.log(res);
      this._washerservice. post_restore_orders(res)
      .subscribe((res)=>{
        console.log(res);
        this.ngOnInit();}, err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
        }); 
        }, err=>{
          console.log(err);
          if(err instanceof  HttpErrorResponse){
            if(err.status=== 500){
              this.router.navigate(['home']);
            }
          }
        });
        }});
    }
}

