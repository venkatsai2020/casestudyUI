import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddonsmangementComponent } from './addonsmangement/addonsmangement.component';
import { AdminComponent } from './admin/admin.component';
import { AdmincareatewasherComponent } from './admincareatewasher/admincareatewasher.component';
import { AdminguardGuard } from './adminguard.guard';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { CarmanagementComponent } from './carmanagement/carmanagement.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CustauthGuard } from './custauth.guard';
import { CustomerBookOrderComponent } from './customer-book-order/customer-book-order.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerMyOrderComponent } from './customer-my-order/customer-my-order.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerScheduledOrderComponent } from './customer-scheduled-order/customer-scheduled-order.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyorderComponent } from './myorder/myorder.component';
import { PlanesmanagementComponent } from './planesmanagement/planesmanagement.component';
import { ScheduledordersComponent } from './scheduledorders/scheduledorders.component';
import { SignupComponent } from './signup/signup.component';
import { WasherguardGuard } from './washerguard.guard';
import { WashrequestComponent } from './washrequest/washrequest.component';
import { WorkerComponent } from './worker/worker.component';
import { WorkerhomeComponent } from './workerhome/workerhome.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
   {path:'signup', component: SignupComponent},
    {path:"login", component: LoginComponent},
    {path:"aboutus",component:AboutusComponent},
    {path:"contactus",component:ContactusComponent},
    {path:'',redirectTo:'home',pathMatch:'full'},

    //worker pages.....
    {path:'worker',component:WorkerComponent,canActivate:[WasherguardGuard],
    children:[
    {path:'washerhome',component:WorkerhomeComponent,canActivate:[WasherguardGuard]},
    {path:'washrequest',component:WashrequestComponent,canActivate:[WasherguardGuard]},
    {path:'myorder',component:MyorderComponent,canActivate:[WasherguardGuard]},
    {path:'scheduledorders',component:ScheduledordersComponent,canActivate:[WasherguardGuard]},
    {path:'',redirectTo:'washerhome',pathMatch:'full'}]
    },

  //customer pages......
  {path:'customer', component:CustomerComponent,canActivate:[CustauthGuard],
  children:[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:CustomerHomeComponent,canActivate:[CustauthGuard]},
  {path:'profile',component:CustomerProfileComponent,canActivate:[CustauthGuard]},
  {path:'order',component:CustomerBookOrderComponent,canActivate:[CustauthGuard]},
  {path:'scheduledorders',component:CustomerScheduledOrderComponent,canActivate:[CustauthGuard]},
  {path:'myorders',component:CustomerMyOrderComponent,canActivate:[CustauthGuard]}],
  },

  //admin pages........
  {path:'admin', component:AdminComponent,canActivate:[AdminguardGuard],
  children:[
  {path:'',redirectTo:'adminhome',pathMatch:'full'},
  {path:'adminhome',component:AdminhomeComponent,canActivate:[AdminguardGuard]},
  {path:'createwasher',component:AdmincareatewasherComponent,canActivate:[AdminguardGuard]},
  {path:'carmanagement',component:CarmanagementComponent,canActivate:[AdminguardGuard]},
  {path:'addonsmanagment',component:AddonsmangementComponent,canActivate:[AdminguardGuard]},
  {path:'plansmanagement',component:PlanesmanagementComponent,canActivate:[AdminguardGuard]}]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents=[HomeComponent,LoginComponent,SignupComponent,WashrequestComponent,WorkerhomeComponent,MyorderComponent
,ScheduledordersComponent,WorkerComponent];

