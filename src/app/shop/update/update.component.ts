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
  submitted: boolean;
  showSuccessMessage: boolean;
  showFailMessage: boolean;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.updateProcess = this.fb.group({
      rfidCtrl: ['', Validators.required],
      optCtrl: ['', Validators.required], // inProcess, ready, complete
      remark: ['']
    });
  }
  update() {

    // new test();

    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const year = now.getUTCFullYear();
    const timestamp = day + '/' + month;

    this.db.list<{status: string}>('OrderDetail/' + year + '/' + month + '/' + day, ref =>
      ref.orderByChild('rfidNum').equalTo(this.updateProcess.value.rfidCtrl))
      .snapshotChanges().subscribe( action => {
        action.forEach( key => {
          if (key.payload.val().status !== 'complete') {
            this.db.list('OrderDetail/' + year + '/' + month + '/' + day)
            .update( key.key, {
              status: this.updateProcess.value.optCtrl,
              timestamp: timestamp,
              remark: this.updateProcess.value.remark
            }).then( val => {
              console.log('Update status of' + key.key + 'complete');
              this.showSuccessMessage = true;
              setTimeout( () => this.showSuccessMessage = false, 5000);
              this.submitted = false;
              this.updateProcess.reset();
            },
            err => {
              this.showFailMessage = true;
              setTimeout( () => this.showFailMessage = false, 5000);

            }
            );
          }
        });
      }
      );
  }
}
