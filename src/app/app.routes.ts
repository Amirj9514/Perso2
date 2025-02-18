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
          
        ]
    },
];
