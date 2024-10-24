import {Routes} from '@angular/router';


export default [
  {
    path: '',
    loadComponent: () => import('./console.component'),

    children: [
      {
        path: 'region',
        loadComponent: () => import('./region/region.component'),
      },
      {
        path: 'country',
        loadComponent: () => import('./country/country.component'),
      },
      {
        path: 'state',
        loadComponent: () => import('./state/state.component'),
      },
      {
        path: 'city',
        loadComponent: () => import('./city/city.component'),
      },
      {
        path: 'address-type',
        loadComponent: () => import('./address-type/address-type.component'),
      },
      {
        path: 'address',
        loadComponent: () => import('./address/address.component')
      },
      {
        path: 'tenant-type',
        loadComponent: () => import('./tenant-type/tenant-type.component'),
      },
      {
        path: 'tenant',
        loadComponent: () => import('./tenant/tenant.component'),
      },
    ]

  }
] as Routes;
