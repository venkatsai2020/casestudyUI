import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { WasherserviceService } from '../washerservice.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {
  custtoken: any;
  decoded: any;
  Custname: any;
  adminname: any;

  constructor(public washerservice:WasherserviceService,private cookie:CookieService) { }

  ngOnInit(): void {
  }

}
