import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

function _window() : any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class CutomerserviceService {

    get nativeWindow() : any {
       return _window();
    }

  constructor(private http:HttpClient,private cookie:CookieService,private router:Router) { }

  //to store order data......
  post_order(ref:any):Observable<any>{
   return this.http.post('http://localhost:7000/orders/',ref);
  }

  //to store schedule order data......
  post_schedule_orders(ref:any):Observable<any>{
    return this.http.post('http://localhost:7000/orders/scheduleorders/',ref);
  }

  //to get order by id.......
  get_order(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/'+id);
  }

  //to get accepted order by id.........
  get_accepted_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/acceptedorders/'+id);
  }

  //to get inprocess orders by id........
  get_inprocess_orders(id:any):Observable<any>{
    console.log('-------');
    return this.http.get('http://localhost:7000/orders/inprocessorders/'+id);
  }

  // to get cancled orderd by id..........
  get_cancled_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/cancledorders/'+id);
  }

  //to get completed orderd by id.......
  get_completed_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/completedorders/'+id);
  }

  //to get scheduled orders by id.......
  get_scheduled_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/scheduleorders/'+id);
  }


  //to check weather the token in their or not .....
  loggedIn(){
    return !!this.cookie.get('custjwt');
  }

  //to logout........
  logout(){
    this.cookie.delete('custjwt');
    this.router.navigate(['home']);
  }

  //to get token...........
  getToken(){
    return this.cookie.get('custjwt');
  }

  //to get paid orders from db by id.....
  get_paid_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/paidorders/'+id);//log_ref_id...as id....
  }

  //to get customer by id........
  get_customer_id(id:any):Observable<any>{
    return this.http.get('http://localhost:5000/customer/'+id);
  }

//to update the order data.......
  update_order(ref:any):Observable<any>{
    return this.http.put('http://localhost:7000/orders',ref);
  }

  //to update the scheduled orders......
  update_scheduled_orders(ref:any):Observable<any>{
    return this.http.put('http://localhost:7000/orders/scheduleorders',ref);
  }

  //to delete the unpaid orders.......
  delete_unpaid_orders(id:any):Observable<any>{
    return this.http.delete('http://localhost:7000/orders/deleteunpaidorders/'+id);
  }
  
//to update the paymentid after the payment done........
  update_paymentid(ref:any):Observable<any>{{
    return this.http.put('http://localhost:7000/orders/updatepaymentid',ref);
  }}

//to store the paid orders in db........
  post_paid_orders(ref:any):Observable<any>{
    return this.http.post('http://localhost:7000/orders/paidorder',ref);
  }

}
