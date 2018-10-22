import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../service/auth.service';
import { map, take, debounceTime } from 'rxjs/operators';

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

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.firstStep = this.fb.group({
      firstCtrl: ['', [Validators.required, this.isMobileExist()]]
    });
    this.secondStep = this.fb.group({
      rfidCtrl: ['', Validators.required]
    });
    this.thirdStep = this.fb.group({
      cloth: ['0'],
      pant: ['0'],
      bedcloth: ['0'],
      blanket: ['0']
    });
  }

  mapOrder() {
    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const hour = now.getUTCHours();
    const min = now.getUTCMinutes();
    const timestamp = hour + ':' + min + '-' + day + '/' + month;
    const mobile = this.firstStep.value.firstCtrl;
    const tagNum = this.secondStep.value.rfidCtrl;
    this.mapTag = this.db.list('TagMapOrder/');
    this.mapTag.push({
      rfidNum : tagNum,
      mobile : mobile
    });
    this.orderDetail = this.db.list('OrderDetail/');
    this.orderDetail.push({
      rfidNum: tagNum,
      mobile: mobile,
      status: 'In Process',
      detail: {
        cloth: this.thirdStep.value.cloth,
        pant: this.thirdStep.value.pant,
        bedcloth: this.thirdStep.value.bedcloth,
        blanket: this.thirdStep.value.blanket
      },
      timestamp: timestamp
    });
    console.log(this.thirdStep.value.cloth);
    console.log('Map order success.');
  }

  isMobileExist(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      // const temp = this.db.list<{status: string}>('OrderDetail', ref =>
      // ref.orderByChild('tel').equalTo(control.value)).snapshotChanges();
      return this.db.list<{tel: string}>('users', ref => ref.orderByChild('tel').equalTo(control.value))
     .snapshotChanges().subscribe(
        action => { action.forEach (tel => {
          if (tel.payload.val().tel !== control.value) {
            return {'isExist': true};
          }
          return null;
        });
      });
    };
  }
}

  // asynMobile(control: FormControl) {
  //   this.db.list<{tel: string}>('users', ref => ref.orderByChild('tel').equalTo(control.value))
  //   .snapshotChanges().subscribe(
  //      action => { action.forEach (tel => {
  //        if (tel.payload.val().tel === control.value) {
  //          console.log('Mobile is match.');
  //          return {
  //            valid: true
  //          };
  //        } else if (tel.payload.val().tel !== control.value) {
  //          console.log('Mobile is not match.');
  //          return {
  //            valid: false
  //          };
  //        }
  //      });
  //     });
        // tel.filter(tel1 => {
        //   if ( tel1.payload.val().tel === control.value) {
        //     console.log('Mobile is match.');
        //     return {
        //       valid: true
        //     };
        //   } else {
        //     console.log('Mobile is not match.');
        //     return {
        //       valid: false
        //     };
        //   }
        // });
    //   })
    // );
    // return this.firstStep.value.firstCtrl;
  // }

  // isMobileExist(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     const mobile = control.value;
  //     return this.db.list('users', ref => ref.orderByChild('tel').equalTo(mobile)).valueChanges().pipe(
  //       debounceTime(500),
  //       take(1),
  //       map(arr => arr.length ? { isMobileExist: false }  : null)
  //     );
  //   };
  // }
// }

// export class CustomValidator {
//   static mobile(db: AngularFireDatabase) {
//     return (control: AbstractControl) => {
//       const mobile = control.value;
//       return db.list('users', ref => ref.orderByChild('tel').equalTo(mobile)).valueChanges().pipe(
//         debounceTime(500),
//         take(1),
//         map(arr => arr.length ? { MobileAvailable: false } : null),
//       );
//     };
//   }
// }
