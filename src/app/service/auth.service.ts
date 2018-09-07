import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

  authState: any = null;
  userRef: AngularFireObject<any>;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe( (auth) => {
      this.authState = auth;
    });

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

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  private updateUserData(): void {
    const path = 'users/${this.currentUserId}';
    const userRef: AngularFireObject<any> = this.db.object(path);

    const data = {
      email: this.authState.email,
      name: this.authState.displayName
    };
    userRef.update(data).catch(error => console.log(error));
  }

  signupWithEmail(email: string, password: string) {
    this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then( (user) => {
      console.log('Sign up with email success', user);
      this.authState = user;
      this.router.navigate(['/']);
    })
    .catch( err => {
      console.log('Sign up with email fail', err.message);
    });
  }

  signinWithEmail( email: string, password: string ) {
    this.afAuth.auth
    .signInWithEmailAndPassword(email, password)
    .then( (user) => {
      this.authState = user;
      this.router.navigate(['/']);
      console.log('Sign in with email success');
    })
    .catch( err => {
      console.log('Sign in with email fail', err.message);
    });
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
    console.log('Log out complete');
  }
}
