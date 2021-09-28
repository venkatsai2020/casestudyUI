import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WasherserviceService } from './washerservice.service';
@Injectable({
  providedIn: 'root'
})
export class WasherguardGuard implements CanActivate {

  constructor(private router:Router,private washerservice:WasherserviceService){}
  canActivate(): boolean{
    if(this.washerservice.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['home']);
    return true;
    }

  }
  
}
