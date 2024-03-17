import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./home/home.page').then(m => m.HomePage)
    },
    {
      path: 'inicio',
      loadChildren: () => import('./page-content/page.routes').then( m => m.routes_initial)
    }

];
