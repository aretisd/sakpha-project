import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  } from '../customer/cus-regis/cus-regis.component'; // Change it after login system finisih

@Injectable({
  providedIn: 'root'
})
// AuthGuard wait login page finish
/*export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.router.navigate(['/cuslogin']);
    return this.auth.isLoggedIn();
  }
} */
@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  customerList: AngularFireList<any>;
  customerKey: Observable<any[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public db: AngularFireDatabase,
  ) {
    this.customerList = this.db.list('users');
    this.customerKey = this.customerList.snapshotChanges().pipe(
      map( changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );
    this.user = afAuth.authState;
  }
  /*
  loginWithFB() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(function(result) {
      this.customerList.push({
        password: result.user.uid,
        name: result.user.displayName,
        email: result.user.email
      });
    });
  }*/
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }
}
