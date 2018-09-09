import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../service/auth.service';
import { CusLoginService } from '../cus-service.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cus-login',
  templateUrl: './cus-login.component.html',
  styleUrls: ['./cus-login.component.css']
})
@Injectable()
export class CusLoginComponent implements OnInit {

  cusLoginForm: FormGroup;
  email: string;
  password: string;

  customerList: AngularFireList<any>;
  private user: Observable<firebase.User>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private customerLogin: CusLoginService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private fb: FormBuilder
  ) {
    this.customerList = this.db.list('users');
    this.user = afAuth.authState;
    this.buildForm();
  }
  submitted: boolean;

  buildForm(): void {
    this.cusLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
    });
  }

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
    this.submitted = true;
    console.log(this.cusLoginForm.value);
    this.authService.signinWithEmail(this.cusLoginForm.value.email, this.cusLoginForm.value.password);
    this.router.navigate(['/customer']);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    console.log(this.cusLoginForm.valid);
  }
}
