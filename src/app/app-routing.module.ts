import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { CusLoginComponent } from './customer/cus-login/cus-login.component';
import { CusRegisComponent } from './customer/cus-regis/cus-regis.component';
import { ShopComponent } from './shop/shop.component';
import { ShopLoginComponent } from './shop/shop-login/shop-login.component';
import { ShopRegisComponent } from './shop/shop-regis/shop-regis.component';

const routes: Routes = [
    { path: 'shopregis', component: ShopRegisComponent },
    { path: 'shoplogin', component: ShopLoginComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'cuslogin', component: CusLoginComponent },
    { path: 'cusregis', component: CusRegisComponent },
    { path: 'customer', component: CustomerComponent }
];

@NgModule( {
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
