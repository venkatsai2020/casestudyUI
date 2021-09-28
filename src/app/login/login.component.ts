import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { LoginSignupService } from '../login-signup.service';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cred:any;
  public emailError:any="";
  public passwordError:any="";
  public emailErrorworker:any="";
  public passwordErrorworker:any="";
  public emailErroradmin:any="";
  public passwordErroradmin:any="";
  constructor(private fb:FormBuilder , private loginservice:LoginSignupService, private router:Router, private route:ActivatedRoute, private cookie:CookieService) { }
  customerloginForm=this.fb.group({
    email: [''],
    password: ['']
  });

  adminloginForm=this.fb.group({
    email: [''],
    password: ['']
  });

  washerloginForm=this.fb.group({
    email: [''],
    password: ['']
  });


  ngOnInit(): void {
  }

  customerlogin(){
    console.log(this.customerloginForm.value);
    this.loginservice.post_customer_login(this.customerloginForm.value)
    .subscribe(res=> {
      console.log('ok')
      console.log(res);
      this.cookie.set('custjwt',res.token);
      this.router.navigate(['customer']);
    }, err=>{
      console.log('--------------');
      console.log(err.error);
      this.emailError=err.error.email;
      this.passwordError=err.error.password;
    });

  };

  adminlogin(){
    //add the api .... importent
    console.log(this.adminloginForm.value);
    this.loginservice.post_admin_login(this.adminloginForm.value)
    .subscribe(res=> {
      console.log('ok');
      this.cookie.set('adminjwt',res.token);
      this.router.navigate(['admin']);
    }, err=>{
      console.log('--------------');
      console.log(err.error);
      this.emailErroradmin=err.error.email;
      this.passwordErroradmin=err.error.password;
      
    });
  }

  washerlogin(){
    console.log(this.washerloginForm.value);
    this.loginservice.post_worker_login(this.washerloginForm.value)
    .subscribe(res=> {
      console.log('ok');
      console.log(res);
      this.cookie.set('washjwt',res.token);
      this.router.navigate(['worker']);
    }, err=>{
      console.log('--------------');
      console.log(err.error);
      this.emailErrorworker=err.error.email;
      this.passwordErrorworker=err.error.password;
      
    });
  }

}
