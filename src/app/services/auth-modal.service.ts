import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  private loginVisibleSubject = new BehaviorSubject<boolean>(false);
  loginVisible$ = this.loginVisibleSubject.asObservable();

  private registerVisibleSubject = new BehaviorSubject<boolean>(false);
  registerVisible$ = this.registerVisibleSubject.asObservable();

  showLogin() {
    this.loginVisibleSubject.next(true);
  }

  hideLogin() {
    this.loginVisibleSubject.next(false);
  }

  showRegister() {
    this.registerVisibleSubject.next(true);
  }

  hideRegister() {
    this.registerVisibleSubject.next(false);
  }
}
