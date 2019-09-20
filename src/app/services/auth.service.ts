import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isUndefined } from 'util';
import { LoginDetails } from '../models/login-details';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  getAuth(loginDetails?: LoginDetails): Observable<User> {
    let httpOptions = {};
    if (!isUndefined(loginDetails)) {
      const headers = new HttpHeaders();
      headers.append('Authorization', 'Basic ' + window.btoa(loginDetails.username + ':' + loginDetails.password));
      httpOptions = {
        headers
      };
    }
    return this.http.get<User>('/api/auth', httpOptions);
  }

  deleteAuth() {
    this.http.delete<void>('/api/auth');
  }
}
