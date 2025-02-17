
import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

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
    }
];
