import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public afAuth: AngularFireAuth,) {
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
    location.reload();

  });
  }

}
