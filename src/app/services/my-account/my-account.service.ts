import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyAccountService {
  private apiUrl =
    'http://basic-spring-app-env.eba-i6chqiqc.eu-north-1.elasticbeanstalk.com/api/';

  constructor(private http: HttpClient) {}

  getProfileData(): Observable<any> {
    return this.http.get(`${this.apiUrl}balance`);
  }

  updateProfileData(transferDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}update`, { transferDetails: 1 });
  }
}
