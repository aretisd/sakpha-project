import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateProcess: FormGroup;
  orderProcess: AngularFireList<any>;
  orderDetail: AngularFireList<any>;
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
    this.orderDetail = this.db.list('OrderDetail', rfid => rfid.orderByChild('rfidNum').equalTo(this.updateProcess.value.rfidCtrl));
    console.log();
    this.orderProcess = this.db.list('OrderDetail');
    // const tagNum = this.updateProcess.value.rfidCtrl;
    // this.orderProcess.update(tagNum, {status: this.updateProcess.value.optCtrl});
  }
}
