import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../../service/auth.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Detail {
  [name: string]: number;
}
export interface User {
  name: string;
  price: number;
}
const orderList: Detail[] = [];

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {

  isLinear = false;
  firstStep: FormGroup;
  secondStep: FormGroup;
  thirdStep: FormGroup;
  orderDetail: AngularFireList<any>;
  mapTag: AngularFireList<any>;
  detail: any;
  price: number;
  obj: {[k: string]: any} = {};
  submitted: boolean;
  showSuccessMessage: boolean;

  isReady = false;
  options: User[] = [
    { name: 'ซัก-รีด', price: 10},
    { name: 'ซัก-รีด-ชุดเดรส', price: 15},
    { name: 'ซัก-รีด-Jacket', price: 15},
    { name: 'รีด', price: 6},
    { name: 'ซัก-พับ', price: 4},
    { name: 'ซัก-พับ-20ชิ้น', price: 60},
    { name: 'ผ้าห่ม-3ฟุตครึ่ง', price: 60},
    { name: 'ผ้าห่ม-5ฟุต', price: 80},
    { name: 'ผ้าห่ม-6ฟุต', price: 80},
    { name: 'ผ้านวม-3ฟุตครึ่ง', price: 100},
    { name: 'ผ้านวม-5ฟุต', price: 120},
    { name: 'ผ้านวม-6ฟุต', price: 140},
    { name: 'ชุดผ้าปูที่นอน-ปลอกหมอน3ชิ้น', price: 40},
    { name: 'ผ้าเช็ดตัว', price: 15},
    { name: 'ผ้าเช็ดผม', price: 5},
    { name: 'ชุดชั้นใน', price: 2},
    { name: 'ถุงเท้า', price: 2},
  ];
  filteredOptions: Observable<User[]>[] = [];

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
  ) {
  }

  ngOnInit() {
    this.firstStep = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondStep = this.fb.group({
      rfidCtrl: ['', Validators.required]
    });
    this.thirdStep = this.fb.group({
      date: [{ value: '', disabled: true}, [Validators.required]],
      notes: [''],
      items: this.initItems()
    });
    this.ManageNameControl(0);
    this.ManageNameControl(1);
    this.isReady = true;
    console.log('form created', this.thirdStep);
  }
  initItems() {
    const formArray = this.fb.array([]);

    for (let i = 0; i < 2; i++) {
      formArray.push(this.fb.group({
        name: ['', [Validators.required]],
        count: ['', [Validators.required]]
      }));
    }
    return formArray;
  }
  ManageNameControl(index: number) {
    const arrayControl = this.thirdStep.get('items') as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get('name').valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }
  addNewItem() {
    const controls = <FormArray>this.thirdStep.controls['items'];
    const formGroup = this.fb.group({
      name: ['', [Validators.required]],
      count: ['', [Validators.required]]
    });
    controls.push(formGroup);
    this.ManageNameControl(controls.length - 1);
  }
  removeItem(i: number) {
    const controls = <FormArray>this.thirdStep.controls['items'];
    controls.removeAt(i);
    this.filteredOptions.splice(i, 1);
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }
  private _filter(name: string): User[] {
    const filterValue = name.toLocaleLowerCase();
    return this.options.filter(option => option.name.toLocaleLowerCase().indexOf(filterValue) === 0);
  }

  getPrice() {
    const controls = <FormArray>this.thirdStep.controls['items'];
    for (let i = 0; i < controls.length; i++) {

      this.price = this.price + controls.at(i).value.name.price * controls.at(i).value.count;

      console.log(this.price);
    }
  }

  get items() {
    return <FormArray>this.thirdStep.get('items');
  }
  mapOrder() {
    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const year = now.getUTCFullYear();
    const hour = now.getUTCHours();
    const min = now.getUTCMinutes();
    const timestamp = day + '/' + month;
    const mobile = this.firstStep.value.firstCtrl;
    const tagNum = this.secondStep.value.rfidCtrl;
    let price = 0;
    const controls = <FormArray>this.thirdStep.controls['items'];

    this.mapTag = this.db.list('TagMapOrder/');
    this.orderDetail = this.db.list('OrderDetail/' + year + '/' + month + '/' + day);

    this.db.list<{email: string}>('users', ref =>
      ref.orderByChild('tel').equalTo(mobile)).valueChanges()
      .subscribe( action =>
        action.forEach ( key => {
          console.log(key.email);
          this.mapTag.push({
            rfidNum : tagNum,
            email: key.email,
            mobile : mobile
        });
        for (let i = 0; i < controls.length; i++) {
          price = price + controls.at(i).value.name.price * controls.at(i).value.count;
          orderList.unshift({
            [controls.at(i).value.name.name]: controls.at(i).value.count
          });
        }
        this.orderDetail.push({
          rfidNum: tagNum,
          email: key.email,
          mobile: mobile,
          price: price,
          status: 'inprogress',
          detail: orderList,
          timestamp: timestamp,
          remark: ''
        });
        // this.orderDetail.update(id, {detail: orderList});
      this.showSuccessMessage = true;
      setTimeout( () => this.showSuccessMessage = false, 5000);
      this.submitted = false;
        window.location.reload();
    }));
    console.log('Map order success.');
  }
}
