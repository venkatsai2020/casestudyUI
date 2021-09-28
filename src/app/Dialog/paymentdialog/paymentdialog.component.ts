import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminserviceService } from 'src/app/adminservice.service';
import { PlanmanagementdialogComponent } from '../planmanagementdialog/planmanagementdialog.component';

@Component({
  selector: 'app-paymentdialog',
  templateUrl: './paymentdialog.component.html',
  styleUrls: ['./paymentdialog.component.scss']
})
export class PaymentdialogComponent implements OnInit {
  paymentref: any;
  stripepayment:any;
  paymentmanage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb:FormBuilder,private adminserivce:AdminserviceService,private matref:MatDialogRef<PlanmanagementdialogComponent>) { }

  ngOnInit(): void {

    this.paymentref=this.data;
    this.paymentmanage=this.fb.group({
      accepted_order_ref_id: [this.data.accepted_order_ref_id],
      addons: [this.data.addons],
      cost: [this.data.cost],
      custaddress: [this.data.custaddress],
      custcarname: [this.data.custcarname],
      custmobile: [this.data.custmobile],
      custname: [this.data.custname],
      date: [this.data.date],
      instruction: [this.data.instruction],
      log_ref_id: [this.data.log_ref_id],
      order_ref_id: [this.data.order_ref_id],
      package: [this.data.package],
      paymentstatus: [this.data.paymentstatus],
      position: [this.data.position],
      process_ref_id: [this.data.process_ref_id],
      schedule: [this.data.schedule],
      status: [this.data.status],
      washer: [this.data.washer],
      washer_ref_id: [this.data.washer_ref_id],
      _id: [this.data._id]  
    });
    
   // this.invokeStripe()

  }
 
  
}