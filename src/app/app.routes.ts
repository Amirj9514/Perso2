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
    data: { roles: ['admin', 'viewer', 'agent'] },
    children: [
      {
        path:'dashboard',
        loadComponent: () =>
          import('./home/home.component').then(
            (m) => m.HomeComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin', 'agent', 'viewer'] },
      },
      {
        path: 'applicant/:id',
        loadComponent: () =>
          import('./dashboard/user-profile/user-profile.component').then(
            (m) => m.UserProfileComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin', 'agent', 'viewer'] },
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./employees/employees.component').then(
            (m) => m.EmployeesComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'vacancies',
        loadComponent: () =>
          import('./vacancies/vacancies.component').then(
            (m) => m.VacanciesComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin', 'agent'] },
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./calender/calender.component').then(
            (m) => m.CalenderComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin', 'agent'] },
      },
      {
        path: 'arbeitgeber',
        loadComponent: () =>
          import('./arbeitgeber/arbeitgeber.component').then(
            (m) => m.ArbeitgeberComponent
          ),
        canActivate: [authGuard],
        data: { roles: ['admin', 'agent'] },
      },
      {
        path: 'behorde',
        loadComponent: () =>
          import('./behorde/behorde.component').then((m) => m.BehordeComponent),
        canActivate: [authGuard],
        data: { roles: ['admin', 'agent'] },
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
