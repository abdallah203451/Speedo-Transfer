import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { LoginComponent } from '../../auth/components/login/login.component';

export const transformGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return true;
  }
  const router = inject(Router);
  const dialog = inject(DialogService);
  const url = state.url;

  if (url.includes('myAccount')) {
    router.navigate(['main-page/404']);
    return false;
  } else if (url.includes('transfer')) {
    dialog.open(LoginComponent, { data: true });
    return false;
  }

  return false;
};
