import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Início',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Minha Lista',
      icon: 'list',
      url: '/lista',
    },
    {
      title: 'Estatísticas',
      icon: 'stats',
      url: '/register'
    },
    {
      title: 'Conta',
      icon: 'contact',
      url: '/register'
    },
    {
      title: 'Sobre',
      icon: 'alert',
      url: '/register'
    },
    {
      title: 'Configurações',
      icon: 'settings',
      url: '/config'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
     public user: UserService,
      public router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async signOut(){
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
}
  
}
