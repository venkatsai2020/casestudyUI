import { Component, OnInit } from '@angular/core';
import { CutomerserviceService } from '../cutomerservice.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode"

@Component({
  selector: 'app-customer-scheduled-order',
  templateUrl: './customer-scheduled-order.component.html',
  styleUrls: ['./customer-scheduled-order.component.scss']
})
export class CustomerScheduledOrderComponent implements OnInit {

  i:any;
  displayedColumns: string[] = ['position', 'status', 'package', 'addons', 'date' , 'washer','custcarname','cost'];
  public dataSource:any;
  public ELEMENT_DATA:any;
  constructor(private customerservice:CutomerserviceService,private cookie:CookieService) { }

  public custtoken:any;
  public decoded:any;

  ngOnInit(): void {

    this.i=0;

    this.custtoken=this.cookie.get('custjwt');
    console.log(this.custtoken);
    this.decoded = jwt_decode(this.custtoken);
    console.log(this.decoded.id);

      this.customerservice.get_scheduled_orders(this.decoded.id)
      .subscribe(data=>{
        this.ELEMENT_DATA=data;
        this.ELEMENT_DATA.forEach((a:any)=>{
          this.i=this.i+1;
          a.position=this.i;
        });
        console.log(data);
        this.dataSource = this.ELEMENT_DATA;
        });
  }

}
