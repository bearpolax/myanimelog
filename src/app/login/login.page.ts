import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular'
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service'
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/services/user.model';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  

	@ViewChild(IonSlides,{static: true}) slides: IonSlides;
  public wavesPosition: number = 0;
  private wavesDifference: number = 100;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  user$: Observable<Usuario>;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public keyboard: Keyboard,
    public router: Router,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private afa: AngularFireAuth,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
  ) { 
    this.menuCtrl.enable(false);
  }

  ngOnInit() { }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      this.router.navigate(['/home'])
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
      await this.router.navigate(['/login']);
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
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
