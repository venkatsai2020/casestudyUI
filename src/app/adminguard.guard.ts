import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminserviceService } from './adminservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {

  constructor(private router:Router,private adminservic:AdminserviceService){}
  canActivate():boolean{
    if(this.adminservic.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['home']);
    return true;
    }
  }
  
}
