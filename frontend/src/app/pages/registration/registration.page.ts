import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RegistrationService } from 'src/app/services/registration.service';
import { RegistrationDetails } from 'src/app/models/registration-details';
import { CustomerRegistrationDetails } from 'src/app/models/customer-registration-details';
import { Position, Profession } from 'src/app/models/interfaces';
import { ProfessionService } from 'src/app/services/profession.service';
import { HttpErrorResponse } from '@angular/common/http';

// status codes
const RESOURCE_CREATED = 201;
const UNAUTHORIZED = 401;

enum RegistrationType {
  VISITOR,
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
  regType: RegistrationType = RegistrationType.VISITOR;
  professions: Profession[] = [];
  message: string;

  constructor(
    private registerService: RegistrationService,
    private professionService: ProfessionService,
    private translateService: TranslateService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.professionService.getAllProfessions().then((professions: Profession[]) => {
      this.professions = professions;
    });
  }

  onRegistrationClick() {
    if (this.regType === RegistrationType.VISITOR) {
      if (this.isValidVisitorRegistrationDeatails(this.registrationDetails)) {
        this.handleRegistration(this.regType);
      }
    } else if (this.regType === RegistrationType.CUSTOMER) {
      if (this.isValidCustomerRegistrationDetails(this.customerRegistrationDetails)) {
        this.handleRegistration(this.regType);
      }
    }
  }

  private isValidVisitorRegistrationDeatails(details: RegistrationDetails) {
    this.displayMessage('clear');
    if (!details.username && !details.password) {
      this.displayMessage('registration.all-empty');
    } else if (!details.username) {
      this.displayMessage('registration.missing-email');
    } else if (!details.password) {
      this.displayMessage('registration.missing-password');
    } else if (!details.confirmationPassword) {
      this.displayMessage('registration.missing-confirmation-password');
    } else if (!this.isValidPassword(details.password)) {
      this.displayMessage('registration.short-password');
      this.registrationDetails.password = '';
    } else if (!this.isPasswordsMatch(details)) {
      this.displayMessage('registration.unmatched-passwords');
    } else {
      return true;
    }
  }

  private isValidCustomerRegistrationDetails(details: CustomerRegistrationDetails) {
    this.displayMessage('clear');
    if (!details.username && !details.password) {
      this.displayMessage('registration.all-empty');
    } else if (!details.username) {
      this.displayMessage('registration.missing-email');
    } else if (!details.password) {
      this.displayMessage('registration.missing-password');
    } else if (!this.isValidPassword(details.password)) {
      this.displayMessage('registration.short-password');
      this.customerRegistrationDetails.password = '';
    } else if (!this.isPasswordsMatch(details)) {
      this.displayMessage('registration.unmatched-passwords');
    } else if (!details.firstName) {
      this.displayMessage('registration.missing-first-name');
    } else if (!details.lastName) {
      this.displayMessage('registration.missing-last-name');
    } else if (!details.phoneNumber) {
      this.displayMessage('registration.missing-phone-number');
    } else if (!details.professionId) {
      this.displayMessage('registration.missing-profession');
    } else if (!this.isValidPhoneNumber(details.phoneNumber)) {
      this.displayMessage('registration.invalid-phone-number');
    } else {
      return true;
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

  // basic check
  private isValidPassword(password: string) {
    return password.length >= 5 ? true : false;
  }

  private isPasswordsMatch(details: RegistrationDetails | CustomerRegistrationDetails) {
    return details.password === details.confirmationPassword ? true : false;
  }

  private isValidPhoneNumber(phoneNumber: string): boolean {
    if (!this.isNumeric(phoneNumber)) {
      return;
    }
    if (phoneNumber.length < 8 || phoneNumber.length > 12) {
      return;
    }
    return true;
  }

  private isNumeric(num: any) {
    return !isNaN(num);
  }

  private handleRegistration(regType: RegistrationType) {
    let details: RegistrationDetails | CustomerRegistrationDetails;
    if (regType === RegistrationType.VISITOR) {
      details = this.registrationDetails;
      details.role = regType;
    } else if (regType === RegistrationType.CUSTOMER) {
      details = this.customerRegistrationDetails;
      details.professionId = +details.professionId;
      details.role = regType;
      // get users actual position
      this.getAndSetLocation(details);
    }
    this.registerService.register(details).subscribe({
      next: (status: any) => {
        if (status === RESOURCE_CREATED) {
          // success
          this.navCtrl.navigateBack('/');
        } else {
          console.error('Something went wrong, response is ' + status);
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.status === UNAUTHORIZED) {
          this.displayMessage(err.error.message);
        } else {
          console.error(err);
        }
      }
    });
  }

  // FIXME not works always
  private getAndSetLocation(customerRegDetails: CustomerRegistrationDetails) {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition((position) => {
        const userPosition: Position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date()
        };
        customerRegDetails.position = userPosition;
        // TODO refactor
        // return userPosition;
      });
    } else {
      console.error('Geolocation is not supported');
    }
  }

  handleRegistrationTypeChange() {
    // before switching screen - remove error message if there was
    this.displayMessage('clear');
    this.regType === RegistrationType.VISITOR
      ? (this.regType = RegistrationType.CUSTOMER)
      : (this.regType = RegistrationType.VISITOR);
  }

  isVisitor(regType: RegistrationType) {
    return regType === RegistrationType.VISITOR ? true : false;
  }

}
