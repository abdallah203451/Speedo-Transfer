import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BaseUrl: string = 'https://localhost:7238/api/User/';
  constructor(private http: HttpClient) {}
  register(userObj: any) {
    return this.http.post<any>(`${this.BaseUrl}register`, userObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.BaseUrl}login`, loginObj);
  }
  renewToken(tokenApi: any) {
    return this.http.post<any>(`${this.BaseUrl}refreshtoken`, tokenApi);
  }
}
