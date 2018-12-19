import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject  } from 'angularfire2/database';

export interface User {
  name: string;
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  isReady = false;
  options: User[] = [
    { name: 'Mary' },
    { name: 'Shelley' },
    { name: 'Igor' }
  ];
  filteredOptions: Observable<User[]>[] = [];
  myForm: FormGroup;
  priceList: AngularFireList<any>;
  objectList: AngularFireObject<any>;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
  ) {
    this.createForm();
  }
  createForm() {
    this.myForm = this.fb.group({
      date: [{ value: '', disabled: true }, Validators.required ],
      notes: [''],
      items: this.initItems()
    });
    this.ManageNameControl(0);
    this.ManageNameControl(1);
    this.isReady = true;
    console.log('form created', this.myForm);
  }
  initItems() {
    const formArray = this.fb.array([]);

    for (let i = 0; i < 2; i++) {
      formArray.push(this.fb.group({
        name: ['', Validators.required ],
        price: ['', Validators.required ],
      }));
    }
    return formArray;
  }
  ManageNameControl(index: number) {
    const arrayControl = this.myForm.get('items') as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get('name').valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }
  addNewItem() {
    const controls = <FormArray>this.myForm.controls['items'];
    const formGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
    controls.push(formGroup);
    this.ManageNameControl(controls.length - 1);
  }
  removeItem(i: number) {
    const controls = <FormArray>this.myForm.controls['items'];
    controls.removeAt(i);
    this.filteredOptions.splice(i, 1);
  }
  ngOnInit() {
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  updateSetting() {
    this.priceList = this.db.list('setting/');
    const controls = <FormArray>this.myForm.controls['items'];
    // console.log(controls.getRawValue());
    controls.value.forEach(x => {
      console.log(x.name.name);
      const temp = this.priceList.query.orderByChild(x.name.name).equalTo(x.name.name);
      console.log(temp);
      // this.db.list('setting', ref => ref.orderByChild(x.name.name).equalTo(x.name.name)).valueChanges()
      // .subscribe( action => {
      //   action.forEach( key => {
      //     console.log(key);
      //   });
      // });
      // if ( this.db.list('setting', ref => ref.orderByChild(x.name.name).equalTo(x.name.name)) ) {
      //   console.log('name is already exist.');
      //   this.db.list('setting/', ref => ref.orderByChild(x.name.name).equalTo(x.name.name)).snapshotChanges()
      //   .subscribe( action => {
      //     action.forEach( key => {
      //       console.log(key.key);
      //       this.priceList.update( key.key,
      //         {[x.name.name]: x.price} );
      //     });
      //   });
      // }
    });

    // for (let i = 0; i < controls.length; i++) {
    //   console.log(controls.at(i).value.name.name);
    //   console.log(controls.at(i).value.price);
    //   this.objectList.set({
    //     [controls.at(i).value.name.name]: controls.at(i).value.price,
    //   });
    // }
  }

}
