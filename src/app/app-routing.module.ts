import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CustomerComponent } from './customer/customer.component';
import { CusLoginComponent } from './customer/cus-login/cus-login.component';
import { CusRegisComponent } from './customer/cus-regis/cus-regis.component';
import { ShopComponent } from './shop/shop.component';
import { ShopLoginComponent } from './shop/shop-login/shop-login.component';
import { ShopRegisComponent } from './shop/shop-regis/shop-regis.component';
import { AddorderComponent } from './shop/addorder/addorder.component';
import { UpdateComponent } from './shop/update/update.component';

import { AuthGuard } from './auth.guard';
import { SendEmailComponent } from './send-email/send-email.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
    { path: 'shopregis', component: ShopRegisComponent},
    { path: 'shoplogin', component: ShopLoginComponent},
    { path: 'shop', component: ShopComponent, canActivate: [AuthGuard]},
    { path: 'cuslogin', component: CusLoginComponent},
    { path: 'cusregis', component: CusRegisComponent},
    { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard]},
    { path: 'addorder', component: AddorderComponent},
    { path: 'updateorder', component: UpdateComponent},
    { path: 'sendemail', component: SendEmailComponent },
    { path: 'reports', component: ReportsComponent }
];

@NgModule( {
    imports: [
        RouterModule.forRoot(routes),
        AngularFireAuthModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
