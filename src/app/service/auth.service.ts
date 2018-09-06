import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.user = afAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithFb() {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider() );
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }
  /* Keep track of key
  this.customerList = this.db.list('users');
    this.customerKey = this.customerList.snapshotChanges().pipe(
      map( changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );
    this.user = afAuth.authState;
    */
}
