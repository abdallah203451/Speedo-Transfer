import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { MyAccountService } from '../../services/my-account/my-account.service';
import { ProfileData } from '../../models/ProfileData';

@Component({
  selector: 'app-user-options',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-options.component.html',
  styleUrl: './user-options.component.scss',
})
export class UserOptionsComponent {
  menuOpen = false;
  fullName!: string;
  initials!: string;

  constructor(
    private auth: AuthService,
    private acc: MyAccountService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.acc.getProfileData().subscribe({
      next: (data) => {
        this.fullName = (<ProfileData>data).name;
        this.initials = this.getInitials(this.fullName);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  getInitials(name: string): string {
    const nameParts = name.split(' ');
    const firstInitial = nameParts[0].charAt(0);
    const lastInitial = nameParts[nameParts.length - 1].charAt(0);
    return firstInitial + lastInitial;
  }

  logOut() {
    this.auth.logout().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    localStorage.removeItem('accessToken');
    this.router.navigate(['home']);
  }
}
