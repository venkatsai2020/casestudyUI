import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-admincareatewasher',
  templateUrl: './admincareatewasher.component.html',
  styleUrls: ['./admincareatewasher.component.scss']
})
export class AdmincareatewasherComponent implements OnInit {

  constructor(private fb:FormBuilder,private loginservice:LoginSignupService) { }

  public option:any=true;
  public option_1:any=false;
  public success=false;
  public emailerror="";
  public passworderror="";
  public addresserror="";
    public addresscityerror="";
      public addresscountryerror="";
      public ziperror="";
       public phoneerror="";
      public nameerror="";
  washersignupForm=this.fb.group({
    name: [''],
    mobile:[],
    addresses:this.fb.group({
      city: [''],
      country: [''],
      zipcode: [''],
      address:['']
    }),
    login_ref_id:['']
  });

  public ref_id:any;
  washersignupForm_1=this.fb.group({
    email: [''],
    password: [''],
  });
  ngOnInit(): void {
  }

  signup(){
    this.loginservice.post_worker_signup(this.washersignupForm_1.value)
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

  signupwasher(){

    console.log(this.ref_id);
    this.washersignupForm.value.login_ref_id=this.ref_id;
    console.log(this.washersignupForm);
    this.loginservice.post_worker_cred_signup(this.washersignupForm.value)
    .subscribe(data=>{
      console.log(data);
      this.addresserror="";
      this.addresscityerror="";
      this.addresscountryerror="";
      this.ziperror="";
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
          this.phoneerror=err.error.mobile;
         this.nameerror=err.error.name;
      });
  }

  }
