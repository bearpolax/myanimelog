import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	password: string = ""
	cpassword: string = ""

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
		public router: Router,
		public menuCtrl: MenuController,
		) { }
		ionViewWillEnter() {

			this.menuCtrl.swipeEnable( false )
		}
	
		ionViewDidLeave() {
	
			this.menuCtrl.swipeEnable( true )
		}

	ngOnInit() {
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async register() {
		const { username, password, cpassword } = this
		if(password !== cpassword) {
			this.presentAlert('Erro!', 'A senha não corresponde')
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(username , password)

			this.afstore.doc(`users/${res.user.uid}`).set({
				username,
			})

			this.user.setUser({
				username,
				uid: res.user.uid
			})

			this.presentAlert('Successo', 'Você foi registrado!')
			this.router.navigate(['/login'])

		} catch(error) {
			console.dir(error)
		}
	}

}