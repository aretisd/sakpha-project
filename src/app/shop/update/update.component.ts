import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateProcess: FormGroup;
  orderProcess: AngularFireList<any>;
  orderDetail: AngularFireObject<any>;
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

    this.orderProcess = this.db.list('OrderDetail');
    this.orderProcess.snapshotChanges(['child_added']).subscribe( action => {
      action.forEach(action1 => {
        if (action1.payload.val().rfidNum === this.updateProcess.value.rfidCtrl &&
            action1.payload.val().status !== 'complete') {
          console.log(action1.key);
          this.orderProcess.update( action1.key, {status: this.updateProcess.value.optCtrl} );
        }
      });
    });
  }
}
