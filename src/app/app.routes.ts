import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path:'login',
        component:AuthComponent
    },

    {
        path:'',
        component: LayoutComponent,
        children:[
          {
            path:'',
            loadComponent:()=>import('./dashboard/dashboard.component').then(m=>m.DashboardComponent)
          },
          {
            path:'employees',
            loadComponent:()=>import('./employees/employees.component').then(m=>m.EmployeesComponent)
          },
          {
            path:'vacancies',
            loadComponent:()=>import('./vacancies/vacancies.component').then(m=>m.VacanciesComponent)
          },
          {
            path:'calendar',
            loadComponent:()=>import('./calender/calender.component').then(m=>m.CalenderComponent)
          }
        ]
    },
];
