import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminserviceService } from '../adminservice.service';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  cars: any;

  constructor(private fb:FormBuilder,private loginservice:LoginSignupService,private adminservice:AdminserviceService) { }
 public option=true;
 public option_1=false;
 public success=false;
  public emailerror="";
  public passworderror="";
  public addresserror="";
    public addresscityerror="";
      public addresscountryerror="";
      public ziperror="";
      public carmodelerror="";
       public carnameerror="";
       public phoneerror="";
      public nameerror="";
  signupForm=this.fb.group({
    name: [''],
    mobile:[],
    car:this.fb.group({
      carName:[''],
      carModel:['']
    }),
    addresses:this.fb.group({
      city: [''],
      country: [''],
      zipcode: [''],
      address:['']
    }),
    login_ref_id:['']
  })
  public ref_id:any;
  signupForm_1=this.fb.group({
    email: [''],
    password: [''],
  })
  ngOnInit(): void {

    this.adminservice.get_carmangement_active()
    .subscribe(data=>{
      console.log(data);
      this.cars=data;
    })
    

  }
 signup(){
  this.loginservice.post_cust_signup(this.signupForm_1.value)
  .subscribe(data=>{
    console.log(data);
    this.ref_id=data._id;
    this.option=false;
    this.option_1=true;
  },
  err=>{
    console.log(err.error);
    this.emailerror=err.error.email;
      this.passworderror=err.error.password;
  });
  
  }

  signupcust(){
    console.log(this.ref_id);
    this.signupForm.value.login_ref_id=this.ref_id;
    console.log(this.signupForm.value.car.carName);
    this.adminservice.get_carmanagemet_by_id(this.signupForm.value.car.carName)
    .subscribe(data=>{
      console.log(data);
      Object.values(data).forEach((ref:any)=>{
        this.signupForm.value.car.carName=ref.carname;
        this.signupForm.value.car.carModel=ref.carmodel
      });
   this.loginservice.post_customer_cred_signup(this.signupForm.value)
    .subscribe(data=>{
      console.log(data);
      this.addresserror="";
      this.addresscityerror="";
      this.addresscountryerror="";
      this.ziperror="";
      this.carmodelerror="";
      this.carnameerror="";
      this.phoneerror="";
      this.nameerror="";
      this.success=true;
      this.option_1=false;
    }, 
    err=>{
       console.log(err.error);
       this.addresserror=err.error.address;
       this.addresscityerror=err.error.city;
        this.addresscountryerror=err.error.country;
         this.ziperror=err.error.zipcode;
         this.carmodelerror=err.error.carmodel;
          this.carnameerror=err.error.carname;
          this.phoneerror=err.error.mobile;
         this.nameerror=err.error.name;
      });
    },err=>{
      this.carnameerror='car name and model is required';
    });
  }

}
