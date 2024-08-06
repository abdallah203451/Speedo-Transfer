import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { LoginComponent } from '../../auth/components/login/login.component';
import { RegisterComponent } from '../../auth/components/register/register.component';
import { CommonModule } from '@angular/common';
import { UserOptionsComponent } from '../user-options/user-options.component';
import { AuthService } from '../../services/authentication/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, UserOptionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLogin;

  constructor(
    private dialog: DialogService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLogin = localStorage.getItem('accessToken');
  }

  toLogin() {
    this.dialog.open(LoginComponent, { data: true });
  }

  toRegister() {
    this.dialog.open(RegisterComponent);
  }
}
