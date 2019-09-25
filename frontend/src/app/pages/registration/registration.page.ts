import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RegistrationDetails } from 'src/app/models/login-details';
import { RegistrationService } from 'src/app/services/registration.service';
import { CustomerRegistrationDetails } from 'src/app/models/customer-registration-details';

enum RegistrationType {
  USER,
  CUSTOMER
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registrationDetails = new RegistrationDetails();
  customerRegistrationDetails = new CustomerRegistrationDetails();
  regType: RegistrationType = RegistrationType.USER;
  professions = [];
  message: string;

  constructor(
    private registerService: RegistrationService,
    private translateService: TranslateService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.addProfessionsToArray();
  }

  addProfessionsToArray() {
    this.translateService.get('registration.professions').subscribe(
      (professionArray: string[]) => {
        professionArray.map((profession: string) => {
          this.professions.push(profession);
        });
      }
    );
  }

  onRegistrationClick() {
    if (this.regType === RegistrationType.USER) {
      if (this.isValidUserRegistration(this.registrationDetails.username, this.registrationDetails.password)) {
        this.onSuccessRegistration(this.regType);
      }
    } else if (this.regType === RegistrationType.CUSTOMER) {
      if (this.isValidCustomerRegistration(
        this.customerRegistrationDetails.username,
        this.customerRegistrationDetails.password,
        this.customerRegistrationDetails.firstName,
        this.customerRegistrationDetails.lastName,
        this.customerRegistrationDetails.phoneNumber,
        this.customerRegistrationDetails.profession
      )) {
        this.onSuccessRegistration(this.regType);
      }
    }
  }

  isValidUserRegistration(username: string, password: string) {
    this.displayMessage('clear');
    if (!username && !password) {
      this.displayMessage('registration.all-empty');
    } else if (!username) {
      this.displayMessage('registration.missing-email');
      return;
    } else if (!password) {
      this.displayMessage('registration.missing-password');
      return;
    } else if (!this.isValidPassword(password)) {
      this.displayMessage('registration.short-password');
      this.registrationDetails.password = '';
      return;
    } else {
      return true;
    }
  }

  isValidCustomerRegistration(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    profession: string
  ) {
    this.displayMessage('clear');
    if (!username && !password) {
      this.displayMessage('registration.all-empty');
    } else if (!username) {
      this.displayMessage('registration.missing-email');
      return;
    } else if (!password) {
      this.displayMessage('registration.missing-password');
      return;
    } else if (!this.isValidPassword(password)) {
      this.displayMessage('registration.short-password');
      this.customerRegistrationDetails.password = '';
      return;
    } else if (!firstName) {
      this.displayMessage('registration.missing-first-name');
      return;
    } else if (!lastName) {
      this.displayMessage('registration.missing-last-name');
      return;
    } else if (!phoneNumber) {
      this.displayMessage('registration.missing-phone-number');
      return;
    } else if (!profession) {
      this.displayMessage('registration.missing-profession');
      return;
    } else {
      return true;
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

  // basic check
  private isValidPassword(password: string) {
    // TODO Check password duplication on backend (is there same password in the db already?)
    if (password.length >= 5) {
      return true;
    }
    return false;
  }

  onSuccessRegistration(regType: RegistrationType) {
    switch (regType) {
      case RegistrationType.USER:
        this.registerService.userRegister(this.registrationDetails).subscribe((res: any) => {
          console.log('ez');
          console.log(res);
          this.navCtrl.navigateBack('/');
        });
        break;
      case RegistrationType.CUSTOMER:
        this.registerService.customerRegister(this.customerRegistrationDetails).subscribe(() => {
          this.navCtrl.navigateBack('/');
        });
        break;
      default:
        console.error('Something went wrong during registration.');
        this.navCtrl.navigateBack('/');
        break;
    }
  }

  handleRegistrationTypeChange() {
    this.regType === RegistrationType.USER
      ? (this.regType = RegistrationType.CUSTOMER)
      : (this.regType = RegistrationType.USER);
  }

}
