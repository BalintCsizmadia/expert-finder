import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { RegistrationDetails } from '../models/login-details';
import { CustomerRegistrationDetails } from '../models/customer-registration-details';
import { URL_PREFIX } from 'src/environments/environment';
import { Status } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // create
  register(details: RegistrationDetails | CustomerRegistrationDetails): Observable<any> { // returns user or exception
    if (details instanceof RegistrationDetails) {
      return this.http.post<any>('/api/register', {
        username: details.username,
        password: details.password,
      });
    } else if (details instanceof CustomerRegistrationDetails) {
      return this.http.post<any>('/api/register', {
        username: details.username,
        password: details.password,
        role: details.role,
        firstName: details.firstName,
        lastName: details.lastName,
        phoneNumber: details.phoneNumber,
        profession: details.profession,
        position: JSON.stringify(details.position)
      });
    } else {
      throw new Error('Something went wrong');
    }
  }

  // read

  // get all users (visitors + customers)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${URL_PREFIX}/users`);
  }

  // TODO implement on backend
  // get all visitors
  getVisitors(): Observable<User[]> {
    return this.http.get<User[]>(`${URL_PREFIX}/visitors`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${URL_PREFIX}/users/${id}`);
  }

  // get all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${URL_PREFIX}/customers`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${URL_PREFIX}/customers/${id}`);
  }

  // update
  updateCustomerStatus(id: number, statusInteger: number): Observable<number> {
    return this.http.put<number>(`${URL_PREFIX}/customers/${id}`, {status: statusInteger});
  }

  // TODO: date?: Date -> handle everywhere
  updateCustomerAvailableDate(id: number, date: Date): Observable<number> {
    return this.http.put<number>(`${URL_PREFIX}/customers/${id}/date`, {availableFrom: date});
  }

  deleteAvailableDateById(id: number): Observable<void> {
    return this.http.put<void>(`${URL_PREFIX}/customers/${id}/date-empty`, {});
  }

}
