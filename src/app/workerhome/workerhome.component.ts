import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { WasherserviceService } from '../washerservice.service';

@Component({
  selector: 'app-workerhome',
  templateUrl: './workerhome.component.html',
  styleUrls: ['./workerhome.component.scss']
})
export class WorkerhomeComponent implements OnInit {
  custtoken:any;
  decoded: any;
  washername: any;

  constructor(private cookie:CookieService,private washservice:WasherserviceService) { }

  ngOnInit(): void {
    this.custtoken=this.cookie.get('washjwt');
    console.log(this.custtoken);
    this.decoded = jwt_decode(this.custtoken);
    console.log(this.decoded.id);

    this.washservice.get_worker_id(this.decoded.id)
    .subscribe((data)=>{
      Object.values(data).forEach((washer:any)=>{
        console.log(washer.name);
        this.washername=washer.name;
      });
    },err=>{
      console.log(err);
    })
    
  }

}
