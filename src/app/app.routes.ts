import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { AccPagesComponent } from './MyAccount/pages/acc-pages/acc-pages.component';
import { ProfileComponent } from './MyAccount/components/profile/profile.component';
import { PaymentComponent } from './MyAccount/components/payment/payment.component';
import { SettingsComponent } from './MyAccount/components/settings/settings.component';
import { MoneyTransferFormComponent } from './Money-Transfer/money-transfer-form/money-transfer-form.component';
import { SwitchSettingsChangePasswordComponent } from './MyAccount/components/switch-settings-change-password/switch-settings-change-password.component';
import { ChangePasswordComponent } from './MyAccount/components/change-password/change-password.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { ErrorComponent } from './MyAccount/components/error/error.component';
import { transformGuardGuard } from './guard/transform-guard/transform-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'main-page',
    component: MainPageComponent,
    children: [
      {
        path: 'myAccount',
        component: AccPagesComponent,
        canActivate: [transformGuardGuard],
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent },
          { path: 'payment-history', component: PaymentComponent },
          {
            path: 'switch',
            component: SwitchSettingsChangePasswordComponent,
            children: [
              { path: '', redirectTo: 'settings', pathMatch: 'full' },
              { path: 'settings', component: SettingsComponent },
              { path: 'change-password', component: ChangePasswordComponent },
            ],
          },
        ],
      },
      {
        path: 'transfer',
        component: MoneyTransferFormComponent,
        canActivate: [transformGuardGuard],
      },
      { path: '404', component: ErrorComponent },
    ],
  },
];
