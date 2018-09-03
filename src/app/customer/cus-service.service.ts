import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CusServiceService {
  constructor(private firebase: AngularFireDatabase) {
    this.customerList = this.firebase.list('users');
  }
  customerList: AngularFireList<any>;

  form = new FormGroup({
    telNum: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', Validators.email),
    name: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  getCustomers() {
    return this.customerList.snapshotChanges();
  }

  insertCustomer(users) {
    console.log(users);
    this.customerList.push({
      tel: users.telNum,
      email: users.email,
      name: users.name,
      birthDate: users.birthDate,
      password: users.password
    });
  }
}
