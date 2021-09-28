import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  constructor(private http:HttpClient) { }

  /*post_customer_login(ref:any):Observable<any>{
    return this.http.post('http://localhost:4000/login/customer',ref);
  }*/
 //to cusotmer login.........
  post_customer_login(ref:any):Observable<any>{
    return this.http.post('http://localhost:8500/gateway/login/customer',ref);
  }


  /*post_worker_login(ref:any):Observable<any>{
    return this.http.post('http://localhost:4000/login/washer',ref);
  }*/

  //to washer login.............
  post_worker_login(ref:any):Observable<any>{
    return this.http.post('http://localhost:8500/gateway/login/washer',ref);
  }

  /*post_admin_login(ref:any):Observable<any>{
    return this.http.post('http://localhost:4000/login/admin',ref);
  }*/


  //admin login.............
  post_admin_login(ref:any):Observable<any>{
    return this.http.post('http://localhost:8500/gateway/login/admin',ref);
  }

  //customer signup...............
  post_cust_signup(ref:any):Observable<any>{
    return this.http.post('http://localhost:4000/signup',ref);
  }

  //washer signup........
  post_worker_signup(ref:any):Observable<any>{
    return this.http.post('http://localhost:4000/signup/worker',ref);
  }

  //to store cutomer data in db.......
  post_customer_cred_signup(ref:any):Observable<any>{
    console.log(ref);
    return this.http.post('http://localhost:5000/customer',ref);
  }
  
  //to store washer data in db...........
  post_worker_cred_signup(ref:any):Observable<any>{
    console.log(ref);
    return this.http.post('http://localhost:8000/worker',ref);
  }
}
