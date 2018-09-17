import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstStep = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondStep = this.fb.group({
      rfidCtrl: ['', Validators.required]
    });
    this.thirdStep = this.fb.group({
      orderDetail: ['0']
    });
  }

}
