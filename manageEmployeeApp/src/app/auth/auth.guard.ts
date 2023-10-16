import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map, take } from 'rxjs';
import { AuthService } from '../appService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  let _router = inject(Router);

  return _authService.user.pipe(
    take(1),
    map((user) => {
      // return user ? true : false;
      if (user) {
        return true;
      } else {
        return _router.createUrlTree(['']);
      }
    })
  );
};
