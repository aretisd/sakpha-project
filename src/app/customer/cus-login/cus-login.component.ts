import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../service/auth.service';
import { CusLoginService } from '../cus-service.service';

@Component({
  selector: 'app-cus-login',
  templateUrl: './cus-login.component.html',
  styleUrls: ['./cus-login.component.css']
})
export class CusLoginComponent implements OnInit {

  constructor(
    public af: AngularFireAuth,
    private router: Router,
    public afService: AuthService,
    public customerLogin: CusLoginService,
    public afAuth: AngularFireAuth,
  ) {}

  submitted: boolean;
  showMessage: boolean;
  formControl = this.customerLogin.loginForm.controls;
  isLoggedIn = false;

  loginWithFB() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(function(result) {
      this.customerList.push({
        password: result.user.uid,
        name: result.user.displayName,
        email: result.user.email
      });
    });
    this.isLoggedIn = true;
    this.router.navigate(['/customer']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.customerLogin.loginForm.valid) {
      // this.customLogin.insertCustomer(this.customLogin.form.value);
      this.showMessage = true;
      setTimeout( () => this.showMessage = false, 3000);
      this.submitted = false;
      this.customerLogin.loginForm.reset();
    }
  }
  ngOnInit() {
  }

}
