import { Component, OnInit } from '@angular/core';
import { LoginDetails } from 'src/app/models/login-details';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { Message } from './message';

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
    if (!this.loginDetails.username && !this.loginDetails.password) {
      this.displayMessage(Message.ALL_FIELDS_ARE_EMPTY);
    } else if (!this.loginDetails.username) {
      this.displayMessage(Message.MISSING_EMAIL);
      return;
    } else if (!this.loginDetails.password) {
      this.displayMessage(Message.MISSING_PASSWORD);
      return;
    } else {
      this.loginSuccess();
    }
  }

  displayMessage(message: string) {
    this.message = message;
  }

  loginSuccess() {
    // TODO backend implementation missing
    //  this.authService.getAuth(this.loginDetails).subscribe(user => {
    //    console.log(user);
    //  });
    // TODO if success
    this.navCtrl.navigateForward('/page/tabs/tab1');

  }

}
