import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RegistrationDetails } from 'src/app/models/login-details';
import { RegistrationService } from 'src/app/services/registration.service';
import { CustomerRegistrationDetails } from 'src/app/models/customer-registration-details';
import { Position } from 'src/app/models/interfaces';

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
  professions = [];
  message: string;
  RESOURCE_CREATED = 201;
  UNAUTHORIZED = 401;

  constructor(
    private registerService: RegistrationService,
    private translateService: TranslateService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.addProfessionsToArray();
    // get users actual position
    this.getAndSetLocation(this.customerRegistrationDetails);
  }

  private addProfessionsToArray() {
    this.translateService.get('registration.professions').subscribe(
      (professionArray: string[]) => {
        professionArray.map((profession: string) => {
          this.professions.push(profession);
        });
      }
    );
  }

  private getAndSetLocation(customerRegDetails: CustomerRegistrationDetails) {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition((position) => {
        const userPosition: Position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date()
        };
        customerRegDetails.position = userPosition;
      });
    } else {
      console.error('Geolocation is not supported');
    }
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
      return;
    } else if (!details.password) {
      this.displayMessage('registration.missing-password');
      return;
    } else if (!this.isValidPassword(details.password)) {
      this.displayMessage('registration.short-password');
      this.registrationDetails.password = '';
      return;
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
      return;
    } else if (!details.password) {
      this.displayMessage('registration.missing-password');
      return;
    } else if (!this.isValidPassword(details.password)) {
      this.displayMessage('registration.short-password');
      this.customerRegistrationDetails.password = '';
      return;
    } else if (!details.firstName) {
      this.displayMessage('registration.missing-first-name');
      return;
    } else if (!details.lastName) {
      this.displayMessage('registration.missing-last-name');
      return;
    } else if (!details.phoneNumber) {
      this.displayMessage('registration.missing-phone-number');
      return;
    } else if (!details.profession) {
      this.displayMessage('registration.missing-profession');
      return;
    } else if (!this.isValidPhoneNumber(details.phoneNumber)) {
      this.displayMessage('registration.invalid-phone-number');
      return;
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

  private isValidPhoneNumber(phoneNumber: string): boolean {
    if (!this.isNumeric(phoneNumber)) {
      return;
    }
    if (phoneNumber.length < 8 && phoneNumber.length > 12) {
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
      details.role = regType;
    }
    this.registerService.register(details).subscribe((status: any) => {
      if (status === this.RESOURCE_CREATED) {
        // success
        this.navCtrl.navigateBack('/');
      } else {
        console.error('Something went wrong, response is ' + status);
      }
    }, (err) => {
      if (err.error.status === this.UNAUTHORIZED) {
        this.displayMessage(err.error.message);
      } else {
        console.error(err);
      }
    });
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
