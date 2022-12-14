import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    // it is a callback
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).
        then(userData => resolve(userData), err => reject(err) )
    });
  }

  register(email: string, password: string) {
    // it is a callback
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).
        then(userData => resolve(userData), err => reject(err))
    });
  }

  getAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  getInfoAboutCurrentUser(){
    return this.afAuth.user;
  }

  logout(){
    this.afAuth.signOut();
  }
}
