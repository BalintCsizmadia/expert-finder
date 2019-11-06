import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDetails } from '../models/login-details';
import { LoggedInUser } from '../models/interfaces';
import { URL_PREFIX } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  setCurrentUser = (user: LoggedInUser) => {
    if (user.authorities && user.authorities[0] === 'ROLE_VISITOR') {
      // set current logged user's id
      localStorage.setItem('user', user.id.toString());
    } else if (!user.authorities && user.user) {
      localStorage.setItem('user', user.user.id.toString());
    }
    localStorage.setItem('isLoggedIn', 'true');
  }

  getCurrentUser() {
    const user = {
      id: localStorage.getItem('user'),
      isLoggedIn: localStorage.getItem('isLoggedIn')
    };
    return user;
  }

  getAuth(loginDetails?: LoginDetails): Observable<LoggedInUser> {
      const headers = new HttpHeaders(loginDetails ? {
        Authorization: 'Basic ' + btoa(loginDetails.username + ':' + loginDetails.password)
      } : {});
      return this.http.get<LoggedInUser>(`${URL_PREFIX}/auth`, { headers });
  }

  deleteAuth() {
    // TODO handle another way
    this.removeUserFromLocalStorage();
    this.http.delete<void>(`${URL_PREFIX}/auth`);
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  }
}
