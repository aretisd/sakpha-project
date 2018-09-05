import { Component, OnInit, Injectable, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { ShopRegisService } from '../shop-service.service';
import { AuthService } from '../../service/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-shop-regis',
  templateUrl: './shop-regis.component.html',
  styleUrls: ['./shop-regis.component.css']
})
export class ShopRegisComponent implements OnInit {

  constructor(
    public shopRegis: ShopRegisService,
    public afService: AuthService,
    public router: Router
  ) { }

  isLoggedIn = false;
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.shopRegis.regisForm.controls;

  onSubmit() {
    this.submitted = true;
    if (this.shopRegis.regisForm.valid && this.shopRegis.regisForm.get('$key').value == null) {
      this.shopRegis.insertShop(this.shopRegis.regisForm.value);
      this.showSuccessMessage = true;
      setTimeout( () => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.shopRegis.regisForm.reset();
    }
  }

  ngOnInit() {
  }

}
