import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../service/auth.service';
import { ShopLoginService } from '../shop-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop-login',
  templateUrl: './shop-login.component.html',
  styleUrls: ['./shop-login.component.css']
})
export class ShopLoginComponent implements OnInit {

  shopLoginForm: FormGroup;
  email: string;
  password: string;


  constructor(
    public afAuth: AngularFireAuth,
    public shopLogin: ShopLoginService,
    public authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  submitted: boolean;

  buildForm(): void {
    this.shopLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
    });
  }

  login() {
    if (this.shopLoginForm.valid) {
      this.router.navigate(['/shop']);
      this.submitted = true;
      console.log(this.shopLoginForm.value);
      this.authService.signinWithEmail(this.shopLoginForm.value.email, this.shopLoginForm.value.password);
      this.email = this.password = '';
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
