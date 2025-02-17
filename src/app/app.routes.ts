
import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children:[
          
        ]
    },
    {
        path:'login',
        component:AuthComponent
    },
    {
        path:'loginPage',
        component:LoginComponent

    }
];
