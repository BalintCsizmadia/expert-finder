import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isUndefined } from 'util';
import { LoginDetails } from '../models/login-details';
import { User } from '../models/user';
import { Customer } from '../models/customer';
import { LoggedInUser } from '../models/interfaces';
import { URL_PREFIX } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  getAuth(loginDetails?: LoginDetails): Observable<LoggedInUser> {
      const headers = new HttpHeaders(loginDetails ? {
        Authorization: 'Basic ' + btoa(loginDetails.username + ':' + loginDetails.password)
      } : {});
      return this.http.get<LoggedInUser>(`${URL_PREFIX}/auth`, { headers });
  }

  deleteAuth() {
    this.http.delete<void>(`${URL_PREFIX}/auth`);
  }
}
