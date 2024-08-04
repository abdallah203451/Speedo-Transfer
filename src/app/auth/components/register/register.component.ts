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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  years: Array<number> = [];
  ref: DialogRef = inject(DialogRef);

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      day: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/)]],
      month: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
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
      confirmPassword: ['', Validators.required],
    });
    this.createYears();
  }

  createYears() {
    for (let i = 2006; i >= 1940; i--) {
      this.years.push(i);
    }
  }
  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    if (this.registerForm.valid) {
      // const obj = {
      //   email: this.UserLogin.email,
      //   password: this.UserLogin.password,
      // }
      this.auth.register(this.registerForm.value).subscribe({
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

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // close() {
  //   this.modalService.hideRegister();
  // }
}
