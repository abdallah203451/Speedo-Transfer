import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyTransferService {
  private apiUrl = 'https://backend-api.com';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/currencies`);
  }

  sendTransferDetails(transferDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, transferDetails);
  }
}
