import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {first} from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(public auth: AngularFireAuth) {

      auth.authState.subscribe(user =>{      
        if(user){
          localStorage.setItem("user", JSON.stringify(user))
        }else{
          localStorage.setItem("user", null)
        }
      })
    }

    async loginGoogle(){
      console.log('hiciste click')
      return await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }

    getCurrentUser(){
      return this.auth.authState
    }

    logout(){
      console.log("asdasdasds2")
      this.auth.signOut()
      localStorage.clear()
    }
}
