import { Component, OnInit } from '@angular/core';
import { LoginDetails } from 'src/app/models/login-details';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';


enum Role {
  VISITOR = 'ROLE_VISITOR',
  CUSTOMER = 'ROLE_CUSTOMER'
}

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
    private userService: UserService,
    private navCtrl: NavController,
    public translateService: TranslateService) { }

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

  private displayMessage(message: string) {
    try {
      this.translateService.get(message).subscribe(
        (translatedMessage: string) => {
          this.message = translatedMessage;
        });
    } catch (err) {
      console.error('Translation error: ' + err.message);
    }
  }

  private loginSuccess() {
    // TODO REFACTOR
    this.authService.getAuth(this.loginDetails).subscribe(user => {
      if (user.authorities && user.authorities[0] === Role.VISITOR) {
        this.navCtrl.navigateForward('/visitor/tabs/tab2');
      } else if (!user.authorities && user.user) {
        this.navCtrl.navigateForward('/customer/tabs/tab2');
      }
    });
  }

  // TODO TEMP
  enterWithoutLogin() {
    this.navCtrl.navigateForward('/visitor/tabs/tab2');
  }

}
