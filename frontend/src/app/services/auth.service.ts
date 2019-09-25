import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isUndefined } from 'util';
import { LoginDetails } from '../models/login-details';
import { User } from '../models/user';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  getAuth(loginDetails?: LoginDetails): Observable<User | Customer> {
    let httpOptions = {};
    if (!isUndefined(loginDetails)) {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Basic ' + window.btoa(loginDetails.username + ':' + loginDetails.password));
      httpOptions = {
        headers
      };
    }
    return this.http.get<User | Customer>('/api/auth', httpOptions);
  }

  // getAuthCustomer(loginDetails?: LoginDetails): Observable<Customer> {
  //   let httpOptions = {};
  //   if (!isUndefined(loginDetails)) {
  //     const headers = new HttpHeaders();
  //     headers.append('Authorization', 'Basic ' + window.btoa(loginDetails.username + ':' + loginDetails.password));
  //     httpOptions = {
  //       headers
  //     };
  //   }
  //   return this.http.get<Customer>('/api/auth/customer', httpOptions);
  // }

  deleteAuth() {
    this.http.delete<void>('/api/auth');
  }
}
