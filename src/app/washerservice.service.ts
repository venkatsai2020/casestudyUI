import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WasherserviceService {

  data:any;
  constructor(private http:HttpClient,private cookie:CookieService,private router:Router) { }
  private url='http://localhost:7000/orders/';
  //to get orders in db......
  getOrders():Observable<any>
  {
     return this.http.get(this.url);
  }
  private url_washer='http://localhost:7000/orders/acceptedorders/';
  //to deleted the workerrequest orders......
  workerAcceptedOrders(id:string):Observable<any>{
    return this.http.delete(this.url+`${id}`);
  }
//to store the worker accepted orders in db.......
  AcceptedOrders(ref:any):Observable<any>{
    return this.http.post(this.url_washer,ref);
  }
//too get the worder accpeted orders...........
  get_Accepted_orders(id:any):Observable<any>{
    return this.http.get(this.url_washer);
  }
  //to delete the worker accepted orders.........
  delete_Accepted_orders(id:any):Observable<any>{
    return this.http.delete(this.url_washer+`${id}`);
  }
//to get he inprocss orders.......
  get_prcessing_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/inprocessorders');
  }
//to store inporcessing orders.........
  post_processing_orders(ref:any):Observable<any>
  {
    return this.http.post('http://localhost:7000/orders/inprocessorders',ref);
  }
//to deleted the inprocessing orders.......
  delete_processing_orders(id:String):Observable<any>{
    return this.http.delete('http://localhost:7000/orders/inprocessorders/'+`${id}`);
  }
//to get the completed orders.........
  get_completed_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/completedorders');
  };
//to stoer the completed orders in db.......
  post_completesd_orders(data:any):Observable<any>{
    return this.http.post('http://localhost:7000/orders/completedorders',data);
  }
//to disp;ay scheduled orders in db......
  get_scheduleorders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/scheduleorders'+id);
  }
//to delete the scheduled orders......
  delete_scheduleorders(id:any):Observable<any>{
    return this.http.delete('http://localhost:7000/orders/scheduleorders/'+id);
  }
//to get cancled orders.........
  get_cancled_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/cancledorders/'+id);
  }
//to store the cancled orders in db........
  post_cancled_orders(ref:any):Observable<any>{
    return this.http.post('http://localhost:7000/orders/cancledorders/',ref);
  }
//to delete the cacled orders..........
  delete_cancled_orders(id:any):Observable<any>{
    return this.http.delete('http://localhost:7000/orders/cancledorders/'+id);
  }
//to store the restor orders.........
  post_restore_orders(ref:any):Observable<any>{
    return this.http.post('http://localhost:7000/orders/restor',ref);
  };
//to get all workers in db...........
  get_workers():Observable<any>{
    return this.http.get('http://localhost:8000/worker');
  };
//to get washer by id............
  get_worker_id(id:any):Observable<any>{
    return this.http.get('http://localhost:8000/worker/'+id);
  }

  loggedIn(){
    return !!this.cookie.get('washjwt');
  }

  logout(){
    this.cookie.delete('washjwt');
    this.router.navigate(['home']);
    
  }

  /////////////////////////////////////////////////////
  getOrders_washer(id:any):Observable<any>
  {
    console.log(id);
     return this.http.get('http://localhost:8500/gateway/getWasherOrders'+id);
  }

  get_washer_cancled_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/washer/cancledorders/'+id);
  }


  get_washer_scheduleorders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/washer/scheduleorders/'+id);
  }

  get_washer_Accepted_orders(id:any):Observable<any>{
    return this.http.get('http://localhost:7000/orders/washer/acceptedorders/'+id);
  }

  get_washer_prcessing_orders(id:any):Observable<any>{
    console.log(id);
    return this.http.get('http://localhost:7000/orders/washer/inprocessorders/'+id);
  }

    get_washer_completed_orders(id:any):Observable<any>{
      return this.http.get('http://localhost:8500/gateway/getWasherCompletedOrders/'+id);
    }

    getToken(){
      return this.cookie.get('washjwt')
    }
}
