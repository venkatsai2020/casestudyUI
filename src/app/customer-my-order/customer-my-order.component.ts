import { Component, OnInit } from '@angular/core';
import { CutomerserviceService } from '../cutomerservice.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { fn } from '@angular/compiler/src/output/output_ast';
let payment_id:any;

@Component({
  selector: 'app-customer-my-order',
  templateUrl: './customer-my-order.component.html',
  styleUrls: ['./customer-my-order.component.scss']
})
export class CustomerMyOrderComponent implements OnInit {

  paymentHandeler:any;
  i:any;
  j:any;
  k:any;
  l:any;
  m:any;
  displayedColumns: string[] = ['position', 'status', 'package', 'addons', 'date' , 'washer','custcarname','cost'];
  public dataSource:any;
  public dataSource_1:any;
  public dataSource_2:any;
  public dataSource_3:any;
  public dataSource_4:any;
  public dataSource_5:any;
  displayedColumns_1: string[] = ['position', 'status', 'package', 'addons', 'date' , 'washer', 'custcarname','cost','button'];
  displayedColumns_5:string[]=['position', 'status', 'paymentid','package', 'addons', 'date' , 'washer', 'custcarname','cost','paymentStatus'];
  
  public custtoken:any;
  public decoded:any;

  public ELEMENT_DATA:any;
  n: any;
  paymentId: any;
  constructor(public customerservice:CutomerserviceService,private cookie:CookieService) { }
  ngOnInit(): void {
    this.i=0;
    this.j=0;
    this.k=0;
    this.l=0;
    this.m=0;
    this.n=0;
    
    this.custtoken=this.cookie.get('custjwt');
    console.log(this.custtoken);
    this.decoded = jwt_decode(this.custtoken);
    console.log(this.decoded.id);


      this.customerservice.get_order(this.decoded.id)
      .subscribe(data=>{
        this.ELEMENT_DATA=data;
        this.ELEMENT_DATA.forEach((a:any)=>{
          this.i=this.i+1;
          a.position=this.i;
        });
        this.dataSource = this.ELEMENT_DATA;
        });

     this.customerservice.get_accepted_orders(this.decoded.id)
     .subscribe(data=>{ this.ELEMENT_DATA=data;
      this.ELEMENT_DATA.forEach((a:any)=>{
        this.j=this.j+1;
        a.position=this.j;
      });
      this.dataSource_1 = this.ELEMENT_DATA;
     });

      
     this.customerservice.get_inprocess_orders(this.decoded.id)
     .subscribe(data=>{ this.ELEMENT_DATA=data;
      this.ELEMENT_DATA.forEach((a:any)=>{
        this.k=this.k+1;
        a.position=this.k;
      });
      this.dataSource_2 = this.ELEMENT_DATA;
     });     

     this.customerservice.get_cancled_orders(this.decoded.id)
     .subscribe(data=>{ this.ELEMENT_DATA=data;
      this.ELEMENT_DATA.forEach((a:any)=>{
        this.l=this.l+1;
        a.position=this.l;
      });
      this.dataSource_3 = this.ELEMENT_DATA;
     }); 

     this.customerservice.get_completed_orders(this.decoded.id)
     .subscribe(data=>{ this.ELEMENT_DATA=data;
      this.ELEMENT_DATA.forEach((a:any)=>{
        this.m=this.m+1;
        a.position=this.m;
      });
      this.dataSource_4 = this.ELEMENT_DATA;
     }); 

     this.customerservice.get_paid_orders(this.decoded.id)
     .subscribe(data=>{ this.ELEMENT_DATA=data;
      this.ELEMENT_DATA.forEach((a:any)=>{
        this.m=this.m+1;
        a.position=this.m;
      });
      this.dataSource_5 = this.ELEMENT_DATA;
     }); 


 // this.invokeStripe();
     
 }


/*invokeStripe(){
  if(!window.document.getElementById('stripe-script')){
    const script=window.document.createElement('script');
    script.id='stripe-script';
    script.type='text/javascript';
    script.src="";
    window.document.body.appendChild(script);
  }
}

 payment(ref:any){
   console.log(ref);
  let  paymentHandeler=(<any>window).StripeCheckout.configure({
     key:'pk_test_51Jc63aSDvA923LmQdba39EisbCc98OgsBO6E7OiwbRe67kyfTj8xESYipuH81zh3m4UuWjNuuRt0rmu8jkkZdIhM000fA26MlM',
     locale:'auto',
     token: function(stripeToken :any){
      
         },
   },
   );


   paymentHandeler.open({
     name:ref.custname,
      description:'payment for carwash',
      amount:ref.cost*100,
   });
   console.log('asgfdgdsh');
 }*/

 async pay(ref:any){
   var reference=this;

 let options = {
    "key": "rzp_test_6o3363SZpkJhOM", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "USD",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response:any){ 
         alert(response.razorpay_payment_id);
         reference.pay1(response,ref);
            /*payment_id=response.razorpay_payment_id
             alert(response.razorpay_order_id);   
    alert(response.razorpay_signature)*/
  },
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };
   options.amount=(ref.cost*100)+'';
 let rzp1 = new this.customerservice.nativeWindow.Razorpay(options);
 console.log(rzp1);
 rzp1.open();
 }


 pay1(ref:any,ref1:any){
   this.paymentId=ref.razorpay_payment_id;
   console.log('-------------');
   console.log(this.paymentId);
   ref1.paymentid=this.paymentId;
   this.customerservice.update_paymentid(ref1)
   .subscribe(data=>{
     console.log(data);
     this.customerservice.delete_unpaid_orders(data._id)
     .subscribe(data=>{
       console.log(data);
      this.customerservice.post_paid_orders(data)
      .subscribe(data=>{
        console.log(data);
        this.ngOnInit();
      });
     });
   });
 }
}

