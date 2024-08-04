import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthModalService } from '../../../services/auth-modal/auth-modal.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { DialogRef } from '@ngneat/dialog';

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
  ref: DialogRef = inject(DialogRef);

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.valid) {
      // const obj = {
      //   email: this.UserLogin.email,
      //   password: this.UserLogin.password,
      // }
      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          //this.notification.showSuccess("User login successful", "Success")
          const token = (<any>response).token;
          // const refreshToken = (<any>response).refreshToken;
          localStorage.setItem('accessToken', token);
          // localStorage.setItem('refreshToken', refreshToken);
          // this.close();
        },
        error: (err) => {
          alert(err?.error.message);
          console.error(err);
          //this.loginForm.reset()
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // close() {
  //   this.modalService.hideLogin();
  // }
}
