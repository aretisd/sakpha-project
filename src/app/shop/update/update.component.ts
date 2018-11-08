import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../../service/auth.service';
// import { ReplaySubject } from 'rxjs/ReplaySubject';
// import '../../../../functions/index.js';

// declare var test: any;

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateProcess: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.updateProcess = this.fb.group({
      rfidCtrl: ['', Validators.required],
      optCtrl: ['', Validators.required]
    });
  }
  update() {

    // new test();

  //   const now = new Date();
  //   const day = now.getUTCDate();
  //   const month = now.getUTCMonth() + 1;
  //   const hour = now.getUTCHours() ;
  //   const min = now.getUTCMinutes();
  //   const timestamp = hour + ':' + min + '-' + day + '/' + month;

  //   this.db.list<{status: string}>('OrderDetail', ref =>
  //     ref.orderByChild('rfidNum').equalTo(this.updateProcess.value.rfidCtrl))
  //     .snapshotChanges().subscribe( action => {
  //       action.forEach( key => {
  //         if (key.payload.val().status !== 'complete') {
  //           this.db.list('OrderDetail').update( key.key, {status: this.updateProcess.value.optCtrl, timestamp: timestamp} );
  //           console.log('Update status of' + key.key + 'complete');
  //         }
  //       });
  //     }
  //     );
  }
}
