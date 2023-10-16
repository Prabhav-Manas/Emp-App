import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthService } from '../appService/auth.service';

export const logInGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  let _router = inject(Router);
  let isLoggedIn = localStorage.getItem('UserData');

  return _authService.user.pipe(
    take(1),
    map((user) => {
      if (isLoggedIn) {
        return _router.createUrlTree(['employees-board']);
      } else {
        return true;
      }
    })
  );
};
