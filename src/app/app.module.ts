import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { CustomerComponent } from './customer/customer.component';
import { CusLoginComponent } from './customer/cus-login/cus-login.component';
import { CusRegisComponent } from './customer/cus-regis/cus-regis.component';
import { ShopRegisComponent } from './shop/shop-regis/shop-regis.component';
import { ShopLoginComponent } from './shop/shop-login/shop-login.component';
import { CusServiceService } from './customer/cus-service.service';
import { ShopServiceService } from './shop/shop-service.service';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    CustomerComponent,
    CusLoginComponent,
    CusRegisComponent,
    ShopRegisComponent,
    ShopLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [CusServiceService, ShopServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
