import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ShopRegisService {

  shopList: AngularFireList<any>;
  constructor(public db: AngularFireDatabase) {
    this.shopList = this.db.list('Shop');
   }

  regisForm = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl('', Validators.email),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    tel: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  insertShop(shop) {
    this.shopList.push({
      name: shop.name,
      email: shop.email,
      password: shop.password,
      telNum: shop.tel
    });
    console.log(shop);
  }
}

@Injectable()
export class ShopLoginService {
  constructor() {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required)
  });
}
