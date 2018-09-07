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
}
