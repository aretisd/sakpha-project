import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import {  } from '../customer/cus-regis/cus-regis.component'; // Change it after login system finisih

@Injectable({
  providedIn: 'root'
})
// AuthGuard wait login page finish
/*export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.router.navigate(['/shoplogin']);
    return this.auth.isLoggedIn();
  }
} */

export class AuthService {

  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.user = afAuth.authState;
  }
  loginWithFB() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(function(result) {
      const uid = result.user.uid;
      const name = result.user.displayName;
      const email = result.user.email;
      const tel = result.user.phoneNumber;
      console.log(name, uid, email, tel);
    });
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }
}
