import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from "./auth/components/login/login.component";
import { MoneyTransferFormComponent } from "./Money-Transfer/money-transfer-form/money-transfer-form.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RegisterComponent, LoginComponent,MoneyTransferFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isRegistrationPopupOpen: boolean = true;
}
