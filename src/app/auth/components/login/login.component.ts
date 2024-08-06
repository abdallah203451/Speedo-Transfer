import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { IdleUserService } from '../../../services/idle-user/idle-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  ref: DialogRef<boolean> = inject(DialogRef);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private idleUserService: IdleUserService,
    private dialog: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
          ),
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        const token = (<any>response).token;
        // const refreshToken = (<any>response).refreshToken;
        localStorage.setItem('accessToken', token);
        // localStorage.setItem('refreshToken', refreshToken);
        this.ref.close();
        this.router.navigate(['home']);
        this.reset();
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
            this.router.navigate(['home']);
            logout.unsubscribe();
          }
        });
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }

  reset() {
    console.log('Reset idle timer');
    this.idleUserService.reset();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  hideAlert() {
    this.ref.data = true;
  }
}
