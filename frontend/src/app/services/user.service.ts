import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { RegistrationDetails } from '../models/login-details';
import { CustomerRegistrationDetails } from '../models/customer-registration-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  // get all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('/api/customers');
  }

  // get user or customer by id
  getUserById(id: number): Observable<User | Customer> {
    return this.http.post<User | Customer>('/api/user/{id}', { id });
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>('/api/user/add', { customer });
  }

  userRegister(registerDetails: RegistrationDetails): Observable<void> {
    return this.http.post<void>('/api/user/register', { registerDetails });
  }

  customerRegister(registerDetails: CustomerRegistrationDetails): Observable<void> {
    return this.http.post<void>('/api/customer/register', { registerDetails });
  }
}
