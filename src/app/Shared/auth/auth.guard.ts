import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { take } from 'rxjs';
import { RolesService } from '../services/roles.service';

export const authGuard: CanActivateFn = (route, state) => {
  let token = null;
  const roles = inject(RolesService);
  const router = inject(Router);
  if (!isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = roles.getRoles();
  const requiredRoles = route.data?.['roles'] as string[];
  console.log('requiredRoles', requiredRoles);
  
  if (requiredRoles && !requiredRoles.includes(userRole)) {
    router.navigate(['/unauthorized']); // Redirect if the user lacks the role
    return false;
  }


  return true;

  // if (!result) {
  //   sharedS.insertData({ key: 'token', val: null });
  //   router.navigateByUrl('/login');
  // }
  // return result;
};

const isAuthenticated = () => {
  let token = null;
  const sharedS = inject(SharedService);
  let isAuthenticated = false;
  sharedS
    .getData()
    .pipe(take(1))
    .subscribe((val: any) => {
      token = val.token;
      if (!token || token.length < 1) {
        isAuthenticated = false;
      } else {
        isAuthenticated = true;
      }
    });

  return isAuthenticated;
};
