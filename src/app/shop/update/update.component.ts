import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateProcess: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.updateProcess = this.fb.group({
      rfidCtrl: ['', Validators.required],
      optCtrl: ['', Validators.required]
    });
  }
}
