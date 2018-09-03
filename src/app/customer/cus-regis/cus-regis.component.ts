import { Component, OnInit } from '@angular/core';

import { CusServiceService } from '../cus-service.service';
@Component({
  selector: 'app-cus-regis',
  templateUrl: './cus-regis.component.html',
  styleUrls: ['./cus-regis.component.css']
})
export class CusRegisComponent implements OnInit {

  constructor(private customerRegis: CusServiceService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.customerRegis.form.controls;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.customerRegis.form.valid) {
      this.customerRegis.insertCustomer(this.customerRegis.form.value);
      this.showSuccessMessage = true;
      setTimeout( () => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.customerRegis.form.reset();
    }
  }
}
