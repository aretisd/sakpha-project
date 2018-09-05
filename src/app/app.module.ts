import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { CustomerComponent } from './customer/customer.component';
import { CusLoginComponent } from './customer/cus-login/cus-login.component';
import { CusRegisComponent } from './customer/cus-regis/cus-regis.component';
import { ShopRegisComponent } from './shop/shop-regis/shop-regis.component';
import { ShopLoginComponent } from './shop/shop-login/shop-login.component';
import { CusRegisService } from './customer/cus-service.service';
import { CusLoginService } from './customer/cus-service.service';
import { ShopServiceService } from './shop/shop-service.service';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AuthService } from './service/auth.service';

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
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    CusRegisService,
    ShopServiceService,
    AuthService,
    CusLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
