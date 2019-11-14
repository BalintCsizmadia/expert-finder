import { Component, OnInit } from '@angular/core';
import { LoginDetails } from 'src/app/models/login-details';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggedInUser } from 'src/app/models/interfaces';

const UNAUTHORIZED = 401;
const GATEWAY_TIMEOUT = 504;

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
    private navCtrl: NavController,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
  }

  onLoginClick() {
    if (!this.loginDetails.username && !this.loginDetails.password) {
      this.displayMessage('login.all-empty');
    } else if (!this.loginDetails.username) {
      this.displayMessage('login.missing-email');
    } else if (!this.loginDetails.password) {
      this.displayMessage('login.missing-password');
    } else {
      this.loginSuccess();
    }
  }

  private displayMessage(messageSource: string) {
    try {
      this.translateService.get(messageSource).subscribe(
        (translatedMessage: string) => {
          this.message = translatedMessage;
        });
    } catch (err) {
      console.error('Translation error: ' + err.message);
    }
  }

  private loginSuccess() {
    // TODO REFACTOR
    this.authService.getAuth(this.loginDetails).subscribe({
      next: (user: LoggedInUser) => {
        console.log(user);
        // set user into localStorage
        this.authService.setCurrentUser(user);
        // navigate to user's oe customer's page
        this.navigateForward(user);
      },
      error: (err: HttpErrorResponse) => {
        this.displayMessage('');
        if (err.status === UNAUTHORIZED) {
          this.displayMessage('login.wrong-data');
        } else if (err.status === GATEWAY_TIMEOUT) {
          this.displayMessage('login.connection-error');
        } else {
          console.error(err);
        }
      }
    });
  }

  private navigateForward(user: LoggedInUser) {
    this.navCtrl.navigateForward(`/${this.getUrlPrefixByRole(user)}/tabs/tab2`);
  }

  private getUrlPrefixByRole(user: LoggedInUser) {
    if (user.authorities && user.authorities[0] === Role.VISITOR) {
      return this.getAuthorityString(user.authorities[0]);
    } else if (!user.authorities && user.user && user.user.authorities[0] === Role.CUSTOMER) {
      return this.getAuthorityString(user.user.authorities[0]);
    }
  }

  private getAuthorityString(authority: string) {
    return authority.split('_')[1].toLowerCase();
  }

  // TODO TEMP
  enterWithoutLogin() {
    this.navCtrl.navigateForward('/visitor/tabs/tab2');
  }

}
