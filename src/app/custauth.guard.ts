import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CutomerserviceService } from './cutomerservice.service';

@Injectable({
  providedIn: 'root'
})
export class CustauthGuard implements CanActivate {

  constructor(private router:Router,private custservice:CutomerserviceService){}
  canActivate(): boolean {
    if(this.custservice.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['home']);
    return true;
    }
  }
  
}
