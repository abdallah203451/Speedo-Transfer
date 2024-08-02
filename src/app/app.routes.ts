import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { AccPagesComponent } from './MyAccount/pages/acc-pages/acc-pages.component';
import { ProfileComponent } from './MyAccount/components/MyProfile/profile/profile.component';
import { PaymentComponent } from './MyAccount/components/PaymentHistory/payment/payment.component';
import { SettingsComponent } from './MyAccount/components/Settings/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'myAccount',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'myAccount',
    component: AccPagesComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'payment-history', component: PaymentComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];
