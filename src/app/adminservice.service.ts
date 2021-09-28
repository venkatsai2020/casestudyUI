import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  token: any;

  constructor(private http:HttpClient,private cookie:CookieService,private router:Router) { }

  post_carmangement(ref:any):Observable<any>{
    console.log(ref);
    return this.http.post('http://localhost:5500/admin/carmangement',ref);
  }

  get_carmangement():Observable<any>{
    return this.http.get('http://localhost:8500/gateway/getCarManagement');
  }

  delete_carmangement(id:any):Observable<any>{
    return this.http.delete('http://localhost:5500/admin/carmangement/'+id);
  }

  put_carmangement(ref:any):Observable<any>{
    return this.http.put('http://localhost:5500/admin/carmangement',ref);
  }
  
  post_addonmangement(ref:any):Observable<any>{
    return this.http.post('http://localhost:5500/admin/addonmangement',ref);
  }

  get_addonmangement():Observable<any>{
    return this.http.get('http://localhost:8500/gateway/getAddonsManagement');
  }

  delete_addonmangement(id:any):Observable<any>{
    return this.http.delete('http://localhost:5500/admin/addonmangement/'+id);
  }

  put_addonmangement(ref:any):Observable<any>{
    return this.http.put('http://localhost:5500/admin/addonmangement',ref);
  }

  post_planmangement(ref:any):Observable<any>{
    return this.http.post('http://localhost:5500/admin/planmangement',ref);
  }

  get_planmangement():Observable<any>{
    return this.http.get('http://localhost:8500/gateway/getPlanManagement');
  }

  delete_planmangement(id:any):Observable<any>{
    return this.http.delete('http://localhost:5500/admin/planmangement/'+id);
  }

  put_planmangement(ref:any):Observable<any>{
    return this.http.put('http://localhost:5500/admin/planmangement',ref);
  }

  get_planmangement_active():Observable<any>{
    return this.http.get('http://localhost:5500/admin/planmangement/active');
  }

  get_addonmangement_active():Observable<any>{
    return this.http.get('http://localhost:5500/admin/addonmangement/active');
  }

  get_package_id(id:any){
    return this.http.get('http://localhost:5500/admin/planmangement/'+id);
  }

  get_addon_id(id:any){
    return this.http.get('http://localhost:5500/admin/addonmangement/'+id);
  }

  loggedIn(){
    return !!this.cookie.get('adminjwt');
  }
  logout(){
    this.cookie.delete('adminjwt');
    this.router.navigate(['home']);
    
  }

  get_admin_id(id:any):Observable<any>{
    return this.http.get('http://localhost:5500/admin/'+id)
  }

  getToken(){
    return this.cookie.get('adminjwt');
  }

  get_carmanagemet_by_id(id:any):Observable<any>{
    return this.http.get('http://localhost:5500/admin/carmanagement/'+id);
  }
  get_carmangement_active():Observable<any>{
    return this.http.get('http://localhost:5500/admin/carmangement/active');
  }

}
