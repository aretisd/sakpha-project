import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../service/auth.service';
import { ShopLoginService } from '../shop-service.service';

@Component({
  selector: 'app-shop-login',
  templateUrl: './shop-login.component.html',
  styleUrls: ['./shop-login.component.css']
})
export class ShopLoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public shopLogin: ShopLoginService,
    public authService: AuthService,
    private router: Router
  ) { }

  submitted: boolean;
  showMessage: boolean;
  formControl = this.shopLogin.loginForm.controls;
  isLoggedIn = false;

  onSubmit() {
    this.submitted = true;
    if (this.shopLogin.loginForm.valid) {
      // this.customLogin.insertCustomer(this.customLogin.form.value);
      this.showMessage = true;
      setTimeout( () => this.showMessage = false, 3000);
      this.submitted = false;
      this.shopLogin.loginForm.reset();
    }
  }

  ngOnInit() {
  }

}
