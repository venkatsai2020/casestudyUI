import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { WasherserviceService } from '../washerservice.service';
import { CutomerserviceService } from '../cutomerservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public adminservice:AdminserviceService,public washerrservice:WasherserviceService,public custservice:CutomerserviceService) { }

  ngOnInit(): void {
  }

}
