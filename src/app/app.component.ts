import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { MoneyTransferFormComponent } from './Money-Transfer/money-transfer-form/money-transfer-form.component';
import { CommonModule } from '@angular/common';
import { AuthModalService } from './services/auth-modal/auth-modal.service';
import { Observable } from 'rxjs';
import { AccPagesComponent } from './MyAccount/pages/acc-pages/acc-pages.component';
import { DownloadComponent } from './shared/download/download.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // loginVisible$?: Observable<boolean>;
  // registerVisible$?: Observable<boolean>;
  // constructor(private modalService: AuthModalService) {}
  // ngOnInit() {
  //   this.loginVisible$ = this.modalService.loginVisible$;
  //   this.registerVisible$ = this.modalService.registerVisible$;
  // }
}
