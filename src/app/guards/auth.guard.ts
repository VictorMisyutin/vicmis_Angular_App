import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).admin_username) return true;
  inject(Router).navigateByUrl('/thirdwardarchive/login')
  return false;
};
