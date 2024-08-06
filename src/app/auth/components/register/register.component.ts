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
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      day: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      month: ['', Validators.required],
      year: ['', [Validators.required]],
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
      confirmPassword: [
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
    if (
      this.registerForm.value.password ==
      this.registerForm.value.confirmPassword
    ) {
      let date = new Date(
        `${this.registerForm.value.year}-${this.registerForm.value.month}-${this.registerForm.value.day}`
      );
      const obj = {
        name: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        // country: this.registerForm.value.country,
        // date: date,
      };
      this.auth.register(obj).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
      this.ref.close();
      this.router.navigate(['home']);
    } else {
      alert('password and the password confirmation must be the same');
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
