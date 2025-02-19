import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let token = null;
  const sharedS = inject(SharedService);
  const router = inject(Router);
  let result = false;
  sharedS
    .getData()
    .pipe(take(1))
    .subscribe((val: any) => {
      token = val.token;
      if (!token || token.length < 1) {
        result = false;
      } else {
        result = true;
      }
    });

    
  if (!result) {
    sharedS.insertData({ key: 'token', val: null });
    router.navigateByUrl('/login');
  }
  return result;
};
