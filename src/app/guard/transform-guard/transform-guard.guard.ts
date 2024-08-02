import { CanActivateFn } from '@angular/router';
import { MoneyTransferFormComponent } from '../../Money-Transfer/money-transfer-form/money-transfer-form.component';

export const transformGuardGuard: CanActivateFn = (route, state) => {
  // const token = localStorage.getItem('accessToken');
  // if (token) {
  //   return true;
  // }
  // else{
  //   if(route.component == MoneyTransferFormComponent){

  //   }
  // }
  return true;
};
