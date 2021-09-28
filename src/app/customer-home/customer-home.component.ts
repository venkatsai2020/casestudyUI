import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CutomerserviceService } from '../cutomerservice.service';
import jwt_decode from "jwt-decode"

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {
  custtoken: any;
  decoded: any;
  Custname: any;

  constructor(public customerservice:CutomerserviceService,private cookie:CookieService) { }

  ngOnInit(): void {

    this.custtoken=this.cookie.get('custjwt');
    console.log(this.custtoken);
    this.decoded = jwt_decode(this.custtoken);
    console.log(this.decoded.id);


    this.customerservice.get_customer_id(this.decoded.id)
    .subscribe(data=>{
      Object.values(data).forEach((cust:any)=>{
        console.log(cust.name);
        this.Custname=cust.name;
      });
    })
  }

}
