import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WorkerComponent } from './worker/worker.component'; 
import { FormsModule } from '@angular/forms';
import { WasherserviceService } from './washerservice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatConfirmDialogComponent } from './Dialog/mat-confirm-dialog/mat-confirm-dialog.component';
import { PrcessDialogComponent } from './Dialog/prcess-dialog/prcess-dialog.component';
import { CompletedDialogComponent } from './Dialog/completed-dialog/completed-dialog.component';
import { CancleDialogComponent } from './Dialog/cancle-dialog/cancle-dialog.component';
import { RestorDialogComponent } from './Dialog/restor-dialog/restor-dialog.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerBookOrderComponent } from './customer-book-order/customer-book-order.component';
import { CustomerScheduledOrderComponent } from './customer-scheduled-order/customer-scheduled-order.component';
import { CustomerMyOrderComponent } from './customer-my-order/customer-my-order.component';
import { CutomerserviceService } from './cutomerservice.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginSignupService } from './login-signup.service';
import { CustauthGuard } from './custauth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdmincareatewasherComponent } from './admincareatewasher/admincareatewasher.component';
import { PlanesmanagementComponent } from './planesmanagement/planesmanagement.component';
import { AddonsmangementComponent } from './addonsmangement/addonsmangement.component';
import { CarmanagementComponent } from './carmanagement/carmanagement.component';
import { CarmanagementDialogComponent } from './Dialog/carmanagement-dialog/carmanagement-dialog.component';
import { AdminserviceService } from './adminservice.service';
import { UpdatecarmanagementDialogComponent } from './Dialog/updatecarmanagement-dialog/updatecarmanagement-dialog.component';
import { AddonsmanagementComponent } from './Dialog/addonsmanagement/addonsmanagement.component';
import { UpdateaddonsmanagementComponent } from './Dialog/updateaddonsmanagement/updateaddonsmanagement.component';
import { UpdateplanmanagementComponent } from './Dialog/updateplanmanagement/updateplanmanagement.component';
import { PlanmanagementdialogComponent } from './Dialog/planmanagementdialog/planmanagementdialog.component';
import { WasherguardGuard } from './washerguard.guard';
import { AdminguardGuard } from './adminguard.guard';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { AdmintokenInterceptorService } from './admintoken-interceptor.service';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentdialogComponent } from './Dialog/paymentdialog/paymentdialog.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    WorkerComponent,
    MatConfirmDialogComponent,
    PrcessDialogComponent,
    CompletedDialogComponent,
    CancleDialogComponent,
    RestorDialogComponent,
    AboutusComponent,
    ContactusComponent,
    CustomerComponent,
    CustomerHomeComponent,
    CustomerProfileComponent,
    CustomerBookOrderComponent,
    CustomerScheduledOrderComponent,
    CustomerMyOrderComponent,
    AdminComponent,
    AdminhomeComponent,
    AdmincareatewasherComponent,
    PlanesmanagementComponent,
    AddonsmangementComponent,
    CarmanagementComponent,
    CarmanagementDialogComponent,
    UpdatecarmanagementDialogComponent,
    AddonsmanagementComponent,
    UpdateaddonsmanagementComponent,
    UpdateplanmanagementComponent,
    PlanmanagementdialogComponent,
    PaymentdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    GooglePayButtonModule,
    NgxPayPalModule

  ],
  providers: [WasherserviceService, CutomerserviceService ,LoginSignupService,CustauthGuard,AdminserviceService,WasherguardGuard
  ,AdminguardGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AdmintokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
