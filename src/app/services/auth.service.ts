import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { LoginDetails } from '../models/login-details';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  getAuth(loginDetails?: LoginDetails): Observable<User> {
    const httpOptions = { headers: null };
    if (!isUndefined(loginDetails)) {
      httpOptions.headers = new HttpHeaders({
        Authorization: 'Basic ' + window.btoa(loginDetails.username + ':' + loginDetails.password)
      });
    }
    return this.http.get<User>('/api/auth', httpOptions);
  }

  deleteAuth() {
    this.http.delete<void>('/api/auth');
  }
}
