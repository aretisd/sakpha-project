import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { CustomerComponent } from './customer/customer.component';
import { CusLoginComponent } from './customer/cus-login/cus-login.component';
import { CusRegisComponent } from './customer/cus-regis/cus-regis.component';
import { ShopRegisComponent } from './shop/shop-regis/shop-regis.component';
import { ShopLoginComponent } from './shop/shop-login/shop-login.component';
import { CusRegisService } from './customer/cus-service.service';
import { CusLoginService } from './customer/cus-service.service';
import { ShopRegisService } from './shop/shop-service.service';
import { ShopLoginService } from './shop/shop-service.service';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AuthService } from './service/auth.service';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { NavtabsComponent } from './navigation/navtabs/navtabs.component';
import { AddorderComponent } from './shop/addorder/addorder.component';
import { UpdateComponent } from './shop/update/update.component';
import { SettingComponent } from './shop/setting/setting.component';
import { BuypackageComponent } from './shop/buypackage/buypackage.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { EmailTestComponent } from './email-test/email-test.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    CustomerComponent,
    CusLoginComponent,
    CusRegisComponent,
    ShopRegisComponent,
    ShopLoginComponent,
    HeaderComponent,
    SidenavListComponent,
    NavtabsComponent,
    AddorderComponent,
    UpdateComponent,
    SettingComponent,
    BuypackageComponent,
    SendEmailComponent,
    EmailTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    BrowserAnimationsModule, HttpClientModule, HttpModule
  ],
  providers: [
    CusRegisService,
    ShopRegisService,
    AuthService,
    CusLoginService,
    ShopLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
