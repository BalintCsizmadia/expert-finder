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

  register(registerDetails: RegistrationDetails | CustomerRegistrationDetails): Observable<void> {
    return this.userService.register(registerDetails);
  }

}
