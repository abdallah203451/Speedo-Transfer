import { Component } from '@angular/core';
import { MyAccountService } from '../../../services/my-account/my-account.service';
import { ProfileData } from '../../../models/ProfileData';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileData?: ProfileData;
  constructor(private acc: MyAccountService) {}

  ngOnInit() {
    this.acc.getProfileData().subscribe({
      next: (data) => {
        this.profileData = <ProfileData>data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
