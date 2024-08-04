import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  isProfilePage: boolean = true;

  showProfile() {
    this.isProfilePage = true;
  }

  showChangePassword() {
    this.isProfilePage = false;
  }
}
