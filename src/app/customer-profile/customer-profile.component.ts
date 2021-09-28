import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  constructor(private cookie:CookieService) { }
  public custtoken:any;
  public decoded:any;

  ngOnInit(): void {
    this.custtoken=this.cookie.get('custjwt');
    console.log(this.custtoken)
    this.decoded = jwt_decode(this.custtoken);
    console.log(this.decoded.id);
  }

}
