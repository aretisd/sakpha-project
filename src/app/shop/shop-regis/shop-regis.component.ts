import { Component, OnInit, Injectable, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { ShopRegisService } from '../shop-service.service';
import { AuthService } from '../../service/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop-regis',
  templateUrl: './shop-regis.component.html',
  styleUrls: ['./shop-regis.component.css']
})
export class ShopRegisComponent implements OnInit {

  shopList: AngularFireList<any>;
  shopRegisForm: FormGroup;
  email: String;
  password: String;
  name: String;
  tel: number;

  constructor(
    public shopRegis: ShopRegisService,
    public authService: AuthService,
    public router: Router,
    private db: AngularFireDatabase
  ) {
    this.shopList = this.db.list('Shop');
   }

  submitted: boolean;
  showSuccessMessage: boolean;

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.shopRegisForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      name: new FormControl('', Validators.required),
      tel: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }

  signup() {
    if (this.shopRegisForm.valid) {
      this.router.navigate(['/shop']);
      this.authService.signupWithEmail(this.shopRegisForm.value.email, this.shopRegisForm.value.password);
      this.shopList.push({
        email: this.shopRegisForm.value.email,
        name: this.shopRegisForm.value.name,
        password: this.shopRegisForm.value.password,
        tel: this.shopRegisForm.value.tel
      });
      this.showSuccessMessage = true;
      setTimeout( () => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.shopRegisForm.reset();
    }
  }

  logout() {
    this.authService.logout();
  }

}
