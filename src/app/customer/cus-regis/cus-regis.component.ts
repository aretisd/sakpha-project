import { Component, OnInit, Injectable, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { CusRegisService } from '../cus-service.service';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-cus-regis',
  templateUrl: './cus-regis.component.html',
  styleUrls: ['./cus-regis.component.css']
})

@Injectable()

export class CusRegisComponent implements OnInit {

  customerList: AngularFireList<any>;

  userForm: FormGroup;
  email: string;
  password: string;
  name: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
  ) {
    this.customerList = this.db.list('users');
  }

  submitted: boolean;
  showSuccessMessage: boolean;

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', Validators.required)
    });

  }

  signup() {
    if (this.userForm.valid) {
      this.authService.signupWithEmail(this.userForm.value.email, this.userForm.value.password);
      this.customerList.push({
        email: this.userForm.value.email,
        name: this.userForm.value.name,
        password: this.userForm.value.password
      });
      this.showSuccessMessage = true;
      setTimeout( () => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.userForm.reset();
    }
  }

  logout() {
    this.authService.logout();
  }
}
