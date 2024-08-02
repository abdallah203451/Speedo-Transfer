import { Routes } from '@angular/router';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { MoneyTransferFormComponent } from './Money-Transfer/money-transfer-form/money-transfer-form.component';

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
    path: 'transfer',
    component: MoneyTransferFormComponent,
  },
];
