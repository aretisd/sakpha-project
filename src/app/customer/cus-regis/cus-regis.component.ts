import { Component, OnInit, Injectable, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { CusServiceService } from '../cus-service.service';
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

  isLoggedIn = false;
  constructor(private customerRegis: CusServiceService, public afService: AuthService, public router: Router) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.customerRegis.form.controls;

  ngOnInit() {
  }

  login(): boolean {
    this.afService.loginWithFB();
    this.router.navigate(['/customer']);
    return this.isLoggedIn = true;
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
