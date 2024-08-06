import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BaseUrl: string =
    'http://basic-spring-app-env.eba-i6chqiqc.eu-north-1.elasticbeanstalk.com/api/';
  constructor(private http: HttpClient) {}
  register(userObj: any) {
    return this.http.post<any>(`${this.BaseUrl}register`, userObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.BaseUrl}login`, loginObj);
  }
  logout() {
    return this.http.post<any>(`${this.BaseUrl}logout`, null);
  }
  renewToken(tokenApi: any) {
    return this.http.post<any>(`${this.BaseUrl}refreshtoken`, tokenApi);
  }
}
