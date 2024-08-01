import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { MoneyTransferFormComponent } from './Money-Transfer/money-transfer-form/money-transfer-form.component';
import { CommonModule } from '@angular/common';
import { AuthModalService } from './services/auth-modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    CommonModule,
    MoneyTransferFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isRegistrationPopupOpen: boolean = true;
  // openRegister: boolean = false;
  // openLogin: boolean = false;

  // openRegisterPage(openRegister: boolean) {
  //   this.openRegister = openRegister;
  // }
  // openLoginPage(openLogin: boolean) {
  //   this.openLogin = openLogin;
  // }
  // closeRegister(isClose: boolean) {
  //   if (isClose) {
  //     this.openRegister = false;
  //   } else {
  //     this.openRegister = false;
  //     this.openLogin = true;
  //   }
  // }
  // closeLogin(isClose: boolean) {
  //   if (isClose) {
  //     this.openLogin = false;
  //   } else {
  //     this.openLogin = false;
  //     this.openRegister = true;
  //   }
  // }

  loginVisible$?: Observable<boolean>;
  registerVisible$?: Observable<boolean>;

  constructor(private modalService: AuthModalService) {}

  ngOnInit() {
    this.loginVisible$ = this.modalService.loginVisible$;
    this.registerVisible$ = this.modalService.registerVisible$;
  }
}
