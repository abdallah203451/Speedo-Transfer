import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { MoneyTransferFormComponent } from './Money-Transfer/money-transfer-form/money-transfer-form.component';
import { CommonModule } from '@angular/common';
import { AccPagesComponent } from './MyAccount/pages/acc-pages/acc-pages.component';
import { DownloadComponent } from './shared/download/download.component';
import { ErrorComponent } from './MyAccount/components/error/error.component';
import { IdleUserService } from './services/idle-user/idle-user.service';
import { AuthService } from './services/authentication/auth.service';
import { DialogService } from '@ngneat/dialog';

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
    AccPagesComponent,
    DownloadComponent,
    ErrorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isError: boolean = false;
  constructor(
    router: Router,
    private idleUserService: IdleUserService,
    private auth: AuthService,
    private dialog: DialogService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isError = event.urlAfterRedirects.endsWith('404');
      }
    });
    if (localStorage.getItem('accessToken')) {
      this.idleUserService.reset();
      let logout = this.idleUserService.userInactive.subscribe((isIdle) => {
        if (isIdle == true) {
          this.auth.logout().subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
          localStorage.removeItem('accessToken');
          this.dialog.open(LoginComponent);
          logout.unsubscribe();
        }
      });
    }
  }
}
