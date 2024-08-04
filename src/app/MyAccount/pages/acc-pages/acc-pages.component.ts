import { Component } from '@angular/core';
import { ProfileComponent } from '../../components/profile/profile.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PaymentComponent } from '../../components/payment/payment.component';
import { SettingsComponent } from '../../components/settings/settings.component';
import { ErrorComponent } from '../../components/error/error.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-acc-pages',
  standalone: true,
  imports: [
    ProfileComponent,
    SidebarComponent,
    PaymentComponent,
    SettingsComponent,
    ErrorComponent,
    RouterOutlet,
  ],
  templateUrl: './acc-pages.component.html',
  styleUrl: './acc-pages.component.scss',
})
export class AccPagesComponent {
  
}
