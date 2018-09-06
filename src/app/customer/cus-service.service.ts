import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class CusLoginService {
  constructor() {
    // this.customerList = this.firebase.list('users');
  }
  // customerList: AngularFireList<any>;
}

@Injectable()
export class CusRegisService {
  customerList: AngularFireList<any>;

  constructor(public db: AngularFireDatabase) {
    this.customerList = this.db.list('users');
  }

  regisForm = new FormGroup({
    email: new FormControl('', Validators.email),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  getCustomers() {
    return this.customerList.snapshotChanges();
  }

  insertCustomer(users) {
    console.log(users);
    const key = this.customerList.push({
      email: users.email,
      name: users.name,
      password: users.password
    }).key;
    console.log(key);
  }
}
