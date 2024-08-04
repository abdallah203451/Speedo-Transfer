import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { LoginComponent } from '../../auth/components/login/login.component';
import { RegisterComponent } from '../../auth/components/register/register.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private dialog: DialogService) {}
  toLogin() {
    // this.authModalService.showLogin();
    this.dialog.open(LoginComponent);
  }

  toRegister() {
    // this.authModalService.showRegister();
    this.dialog.open(RegisterComponent);
  }
}
