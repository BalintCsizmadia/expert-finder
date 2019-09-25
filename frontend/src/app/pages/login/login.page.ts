import { Component, OnInit } from '@angular/core';
import { LoginDetails } from 'src/app/models/login-details';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginDetails: LoginDetails = new LoginDetails();
  message: string;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private translateService: TranslateService) { }

  ngOnInit() {
  }

  onLoginClick() {
    if (!this.loginDetails.username && !this.loginDetails.password) {
      this.displayMessage('login.all-empty');
    } else if (!this.loginDetails.username) {
      this.displayMessage('login.missing-email');
      return;
    } else if (!this.loginDetails.password) {
      this.displayMessage('login.missing-password');
      return;
    } else {
      this.loginSuccess();
    }
  }

  displayMessage(message: string) {
    try {
      this.translateService.get(message).subscribe(
        (translatedMessage: string) => {
          this.message = translatedMessage;
        });
    } catch (err) {
      console.error('Translation error: ' + err.message);
    }
  }

  loginSuccess() {
    // TODO backend implementation missing
    //  this.authService.getAuth(this.loginDetails).subscribe(user => {
    //    console.log(user);
    //  });
    // TODO if success
    this.navCtrl.navigateForward('/page/tabs/tab1');
  }

  // TODO TEMP
  enterWithoutLogin() {
    this.navCtrl.navigateForward('/page/tabs/tab2');
  }

}
