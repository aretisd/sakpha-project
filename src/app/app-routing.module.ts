import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CustomerComponent } from './customer/customer.component';
import { CusLoginComponent } from './customer/cus-login/cus-login.component';
import { CusRegisComponent } from './customer/cus-regis/cus-regis.component';
import { ShopComponent } from './shop/shop.component';
import { ShopLoginComponent } from './shop/shop-login/shop-login.component';
import { ShopRegisComponent } from './shop/shop-regis/shop-regis.component';

// import { AuthGuard } from './service/auth.service';

const routes: Routes = [
    { path: 'shopregis', component: ShopRegisComponent},
    { path: 'shoplogin', component: ShopLoginComponent},
    { path: 'shop', component: ShopComponent},
    { path: 'cuslogin', component: CusLoginComponent},
    { path: 'cusregis', component: CusRegisComponent},
    { path: 'customer', component: CustomerComponent}
];

@NgModule( {
    imports: [
        RouterModule.forRoot(routes),
        AngularFireAuthModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
