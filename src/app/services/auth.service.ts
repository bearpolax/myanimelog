import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from './user.model';
import { User } from '../interfaces/user';


@Injectable({ providedIn: 'root' })
export class AuthService {
    user$: Observable<Usuario>;

    constructor(
        private afa: AngularFireAuth,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router

    ){
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<Usuario>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );

    }
    login(user: User) {
        return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
      }
    
      register(user: User) {
        return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
      }

    async googleSignin() {
		const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        await this.router.navigate(['/home']);
        return this.updateUserData(credential.user);
        

    }
    async signOut(){
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/login']);
    }

    private updateUserData({uid, email, displayName, photoURL }: Usuario){
       //sets user data to firestore on login
       const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`users/${uid}`);
       
       const data = {
           uid,
           email,
           displayName,
           photoURL
       };

       return userRef.set(data, { merge: true });

    }

}