import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './Shared/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin' ,'agent'] },
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./employees/employees.component').then(
            (m) => m.EmployeesComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'vacancies',
        loadComponent: () =>
          import('./vacancies/vacancies.component').then(
            (m) => m.VacanciesComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin','agent'] }
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./calender/calender.component').then(
            (m) => m.CalenderComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin' ,'agent'] }
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
