import { Component, OnInit, Injectable, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { CusRegisService } from '../cus-service.service';
import { AuthService } from '../../service/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cus-regis',
  templateUrl: './cus-regis.component.html',
  styleUrls: ['./cus-regis.component.css']
})

@Injectable()

export class CusRegisComponent implements OnInit {


  constructor(
    private customerRegis: CusRegisService,
    public authService: AuthService,
    public router: Router
  ) { }

  isLoggedIn = false;
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.customerRegis.regisForm.controls;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.customerRegis.regisForm.valid) {
      this.customerRegis.insertCustomer(this.customerRegis.regisForm.value);
      this.showSuccessMessage = true;
      setTimeout( () => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.customerRegis.regisForm.reset();
    }
  }
}
