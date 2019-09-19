import { Component, OnInit } from '@angular/core';
import { LoginDetails } from 'src/app/models/login-details';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginDetails: LoginDetails = new LoginDetails();
  message: string;

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  onLoginClick() {
    // this.displayMessage('');
    if (!this.loginDetails.username && !this.loginDetails.password) {
      this.displayMessage('Please fill out the given fields');
    } else if (!this.loginDetails.username) {
      this.displayMessage('Missing email address');
      console.error('Missing email');
      return;
    } else if (!this.loginDetails.password) {
      this.displayMessage('Missing password');
      console.error('Missing password');
      return;
    } else {
      this.loginSuccess();
    }
  }

  displayMessage(message: string) {
    this.message = message;
  }

  loginSuccess() {
    // this.authService.getAuth(this.loginDetails);
    // TODO if success
    this.navCtrl.navigateForward('/page/tabs/tab1');

  }

}
