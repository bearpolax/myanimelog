import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FirebaseUIModule } from 'firebaseui-angular';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username: string = ""
	password: string = ""

	constructor(public auth: AuthService, public afAuth: AngularFireAuth, public user: UserService, public router: Router, public menuCtrl: MenuController) { }
	
	ionViewWillEnter() {

		this.menuCtrl.swipeEnable( false )
	}

	ionViewDidLeave() {

		this.menuCtrl.swipeEnable( true )
	}

	ngOnInit() {
	}

	async login() {
		const { username, password } = this
		try {
			// kind of a hack. 
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username , password)
			
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})
				this.router.navigate(['/tabs'])
			}
		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("Usuário não foi encontrado")
			}
		}
		
	}
	

}