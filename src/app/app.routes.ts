import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'auth',
        // canActivate[],
        loadChildren: () => import('./auth/auth.routes')
    },
    {
        path: '',
        loadComponent: () => import('./shared/ui/layout/layout.component'),

        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./modules/dashboard/dashboard.component')
            }, {
                path: 'console',
                loadComponent: () => import('./modules/console/console.component')
            },
            {
                path: '*',
                redirectTo: 'dashboard'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
