import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../service/auth.service';
import { CusLoginService } from '../cus-service.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  } from 'querybase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cus-login',
  templateUrl: './cus-login.component.html',
  styleUrls: ['./cus-login.component.css']
})
export class CusLoginComponent implements OnInit {

  email: string;
  password: string;

  customerList: AngularFireList<any>;
  private user: Observable<firebase.User>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private customerLogin: CusLoginService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.customerList = this.db.list('users');
    this.user = afAuth.authState;
  }

  cusLoginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required)
  });

  submitted: boolean;

  loginWithFB() {
    const userDB = this.customerList;
    this.authService.signInWithFb().then ( (res) => {
      if (res.additionalUserInfo.isNewUser) {
        userDB.push({
          password: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        });
        this.router.navigate(['/customer']);
        console.log(res.additionalUserInfo.isNewUser);
      } else {
        this.router.navigate(['/customer']);
        console.log(res.user.displayName);
      }
    })
    .catch( (err) => console.log(err));
  }

  login() {
    console.log(this.cusLoginForm.value);
    this.authService.signinWithEmail(this.cusLoginForm.value.email, this.cusLoginForm.value.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.cusLoginForm.value);
    if (this.cusLoginForm.valid) {
    }
  }

  /*checkUserPass(): boolean {
    const email = this.cusLoginForm.value.email;
    const pass = this.cusLoginForm.value.password;

  }*/
  ngOnInit() {

  }

}
