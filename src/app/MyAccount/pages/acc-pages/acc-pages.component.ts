import { Component } from '@angular/core';
import { ProfileComponent } from "../../components/MyProfile/profile/profile.component";
import { SidebarComponent } from "../../components/sidebar/sidebar/sidebar.component";
import { PaymentComponent } from "../../components/PaymentHistory/payment/payment.component";
import { SettingsComponent } from "../../components/Settings/settings/settings.component";
import { ErrorComponent } from "../../components/404error/error/error.component";

@Component({
  selector: 'app-acc-pages',
  standalone: true,
  imports: [ProfileComponent, SidebarComponent, PaymentComponent, SettingsComponent, ErrorComponent],
  templateUrl: './acc-pages.component.html',
  styleUrl: './acc-pages.component.scss'
})
export class AccPagesComponent {

}
