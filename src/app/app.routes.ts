import {Routes} from '@angular/router';


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
        loadChildren: () => import('./modules/console/console.routes')
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
