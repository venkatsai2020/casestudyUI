import { Component, OnInit } from '@angular/core';
import { order } from '../order';
import { CutomerserviceService } from '../cutomerservice.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { WasherserviceService } from '../washerservice.service';
import { AdminserviceService } from '../adminservice.service';
import { ObjectUnsubscribedError, Observable } from 'rxjs';


@Component({
  selector: 'app-customer-book-order',
  templateUrl: './customer-book-order.component.html',
  styleUrls: ['./customer-book-order.component.scss']
})
export class CustomerBookOrderComponent implements OnInit {

 /* public statu:boolean=false;
  ordermodel=new order("","","","",false,"","");
  success=false;*/
  public success:any=false;
  public custtoken:any;
  public decoded:any;
  public decoded_id:any
  packagearray:any;
  addonarray: any;
  washeiddata:any;
  nameid: any;
  price=500;
  constructor(private customerservice:CutomerserviceService,private cookie:CookieService, private fb:FormBuilder,private washerservice:WasherserviceService
    ,private adminservice:AdminserviceService) { }

  bookorder=this.fb.group({
    package:[''],
    addons:[''],
    date:[''],
    washer:[""],
    schedule:['false'],
    instruction:[''],
    log_ref_id:[''],
    washer_ref_id:[''],
    custname:[''],
    custaddress:[''],
    custcarname:[''],
    custmobile:[],
    cost:[],
    order_id:['']
  });
  addonserror:any="";
dateerror: any="";
packageerror: any="";
washererror: any="";
workerarray:any;

  ngOnInit(): void {


    this.custtoken=this.cookie.get('custjwt');
    console.log(this.custtoken)
    this.decoded = jwt_decode(this.custtoken);
    console.log(this.decoded.id);
    this.decoded_id=this.decoded.id;
      //for worker name...
     this.washerservice.get_workers()
     .subscribe(data=>{
       console.log(data);
       this.workerarray=data;
     })
      //for packages....
     this.adminservice.get_planmangement_active()
     .subscribe(data=>{
       console.log(data);
       this.packagearray=data;
         })

      //for addOns.....*/

      this.adminservice.get_addonmangement_active()
      .subscribe(data=>{
        console.log(data);
        this.addonarray=data;
      })


  }
 onsubmit(){

   console.log(this.bookorder.value);
   if(this.bookorder.value.schedule==="false"){
   /*  this.bookorder.value.log_ref_id=this.decoded_id;
     this.bookorder.value.washer_ref_id=this.bookorder.value.washer;
     this.washerservice.get_worker_id(this.bookorder.value.washer_ref_id)
     .subscribe(data=>{
        console.log('-----------');
        Object.values(data).forEach((ddd:any)=>{
          this.nameid=ddd.name
        });
     this.bookorder.value.washer=this.nameid;
     this.customerservice.post_order(this.bookorder.value)
    .subscribe(data=> {console.log(data);
      this.success=true;}
    ,err=>{
      console.log(err.error);
      this.addonserror= err.error.addons;
      this.dateerror= err.error.date;
      this.packageerror= err.error.package;
      this.washererror= err.error.washer;
    }
    );
     });*/
     console.log(this.bookorder.value);
     this.bookorder.value.log_ref_id=this.decoded_id;
     this.bookorder.value.washer_ref_id=this.bookorder.value.washer;
     console.log(this.bookorder.value);
     this.customerservice.post_order(this.bookorder.value)
     .subscribe(data_1=> {
       //
       console.log(data_1);
       this.success=true;
      //
      this.washerservice.get_worker_id(this.bookorder.value.washer_ref_id)
      .subscribe(data=>{
       Object.values(data).forEach((ddd:any)=>{
         this.nameid=ddd.name;
       });
       this.bookorder.value.washer=this.nameid;
       console.log(this.bookorder.value);
       this.adminservice.get_package_id(this.bookorder.value.package)
       .subscribe(data=>{
           Object.values(data).forEach((ddd:any)=>{
             this.bookorder.value.package=ddd.name;
             this.price=this.price+ddd.cost;
             });
           console.log(this.bookorder.value);
         this.adminservice.get_addon_id(this.bookorder.value.addons)
         .subscribe(data=>{
           Object.values(data).forEach((ddd:any)=>{
             this.bookorder.value.addons=ddd.name;
             this.price=this.price+ddd.cost;
           });
           console.log(this.bookorder.value);
           console.log(this.price);
           this.customerservice.get_customer_id(this.bookorder.value.log_ref_id)
           .subscribe(data=>{
             console.log(data);
             Object.values(data).forEach((ddd:any)=>{
               console.log(ddd);
               this.bookorder.value.custname=ddd.name,
               this.bookorder.value.custaddress=ddd.addresses.address,
               this.bookorder.value.custcarname=ddd.car.carName,
               this.bookorder.value.custmobile=ddd.mobile
             });
             this.bookorder.value.cost=this.price;
             this.bookorder.value.order_id=data_1._id;
             console.log(this.bookorder.value);
            ///update.......
            this.customerservice.update_order(this.bookorder.value)
            .subscribe(data=>{
              console.log(data);
            })
           });
         });
       });
      });
      },
       err=>{
         console.log(err.error);
         this.addonserror= err.error.addons;
           this.dateerror= err.error.date;
         this.packageerror= err.error.package;
       this.washererror= err.error.washer;
       });
      }
    else{
      this.bookorder.value.log_ref_id=this.decoded_id;
      
      console.log(this.bookorder.value);
     this.bookorder.value.log_ref_id=this.decoded_id;
     this.bookorder.value.washer_ref_id=this.bookorder.value.washer;
     console.log(this.bookorder.value);
     this.customerservice.post_schedule_orders(this.bookorder.value)
     .subscribe(data_1=> {
       //
       console.log(data_1);
       this.success=true;
      //
      this.washerservice.get_worker_id(this.bookorder.value.washer_ref_id)
      .subscribe(data=>{
       Object.values(data).forEach((ddd:any)=>{
         this.nameid=ddd.name;
       });
       this.bookorder.value.washer=this.nameid;
       console.log(this.bookorder.value);
       this.adminservice.get_package_id(this.bookorder.value.package)
       .subscribe(data=>{
           Object.values(data).forEach((ddd:any)=>{
             this.bookorder.value.package=ddd.name;
             this.price=this.price+ddd.cost;
             });
           console.log(this.bookorder.value);
         this.adminservice.get_addon_id(this.bookorder.value.addons)
         .subscribe(data=>{
           Object.values(data).forEach((ddd:any)=>{
             this.bookorder.value.addons=ddd.name;
             this.price=this.price+ddd.cost;
           });
           console.log(this.bookorder.value);
           console.log(this.price);
           this.customerservice.get_customer_id(this.bookorder.value.log_ref_id)
           .subscribe(data=>{
             console.log(data);
             Object.values(data).forEach((ddd:any)=>{
               console.log(ddd);
               this.bookorder.value.custname=ddd.name,
               this.bookorder.value.custaddress=ddd.addresses.address,
               this.bookorder.value.custcarname=ddd.car.carName,
               this.bookorder.value.custmobile=ddd.mobile
             });
             this.bookorder.value.cost=this.price;
             this.bookorder.value.order_id=data_1._id;
             console.log(this.bookorder.value);
            ///update.......
            this.customerservice.update_scheduled_orders(this.bookorder.value)
            .subscribe(data=>{
              console.log(data);
            })
           });
         });
       });
      });
      },
       err=>{
         console.log(err.error);
         this.addonserror= err.error.addons;
           this.dateerror= err.error.date;
         this.packageerror= err.error.package;
       this.washererror= err.error.washer;
       });
    }
  }
}