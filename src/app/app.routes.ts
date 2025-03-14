import {Routes} from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.routes').then(value => {
      return value.default;
    }).catch(reason => {
      console.error("error")
      return reason;
    })
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  }
  /*
  {
    path: 'console',
    loadChildren: () => import('./modules/console/console.routes').then(value => {
      return value;
    })
  },
  {
    path: '**',
    redirectTo: '/public',
    pathMatch: 'full',
  }

   */
]

/*
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

 */
