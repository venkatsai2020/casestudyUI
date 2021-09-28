import { Injectable,  Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CutomerserviceService } from './cutomerservice.service';
import { AdminserviceService } from './adminservice.service';
import { Observable } from 'rxjs';
import { WasherserviceService } from './washerservice.service';



@Injectable({
  providedIn: 'root'
})
export class AdmintokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req:any,next:any){
    if(req.url.startsWith('http://localhost:5500')){
    let _adminAuth=this.injector.get(AdminserviceService)
    const tokenizedReq = req.clone({
      setHeaders:{
        Authorization : `Bearer ${_adminAuth.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
  
  let _adminAuth=this.injector.get(WasherserviceService)
    const tokenizedReq = req.clone({
      setHeaders:{
        Authorization : `Bearer ${_adminAuth.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
}

}
