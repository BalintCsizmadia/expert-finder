import { Injectable } from '@angular/core';
import { RegistrationDetails } from '../models/login-details';
import { Observable } from 'rxjs';
import { CustomerRegistrationDetails } from '../models/customer-registration-details';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private userService: UserService) { }

  userRegister(registerDetails: RegistrationDetails): Observable<void> {
    return this.userService.userRegister(registerDetails);
  }

  customerRegister(registerDetails: CustomerRegistrationDetails): Observable<void> {
    return this.userService.customerRegister(registerDetails);
  }

}
