import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationDetails } from '../models/registration-details';
import { CustomerRegistrationDetails } from '../models/customer-registration-details';
import { HttpClient } from '@angular/common/http';
import { URL_PREFIX } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(details: RegistrationDetails | CustomerRegistrationDetails): Observable<any> { // returns user or exception
    if (details instanceof RegistrationDetails) {
      return this.http.post<any>(`${URL_PREFIX}/register`, {
        username: details.username,
        password: details.password,
      });
    } else if (details instanceof CustomerRegistrationDetails) {
      return this.http.post<any>(`${URL_PREFIX}/register`, {
        username: details.username,
        password: details.password,
        role: details.role,
        firstName: details.firstName,
        lastName: details.lastName,
        phoneNumber: details.phoneNumber,
        professionId: details.professionId,
        position: JSON.stringify(details.position)
      });
    } else {
      throw new Error('Something went wrong');
    }
  }


}
