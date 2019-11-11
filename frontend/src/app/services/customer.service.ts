import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { LoggedInUser } from '../models/interfaces';
import { URL_PREFIX } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // get all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${URL_PREFIX}/customers`);
  }

  getCustomerByUserId(userId: number): Observable<LoggedInUser> {
    return this.http.get<LoggedInUser>(`${URL_PREFIX}/customers/${userId}`);
  }

  // update
  /**
   * @param id customerId
   * @param statusInteger (0) - AVAILAbLE; (1) - UNAVAILABLE
   */
  updateCustomerStatus(id: number, statusInteger: number): Observable<number> {
    return this.http.put<number>(`${URL_PREFIX}/customers/${id}`, { status: statusInteger });
  }

  updateCustomerAvailableDate(id: number, date: Date): Observable<number> {
    return this.http.put<number>(`${URL_PREFIX}/customers/${id}/date`, { availableFrom: date });
  }

  updateCustomerPosition(id: number, currentPosition: string): Observable<number> {
    return this.http.put<number>(`${URL_PREFIX}/customers/${id}/position`, { position: currentPosition });
  }

  // TODO type fix
  getCustomersByProfession(selectedProfession: string): Observable<any> {
    return this.http.post<any>(`${URL_PREFIX}/customers/profession`, { profession: selectedProfession });
  }
}
