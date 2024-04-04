import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from 'src/Guards/AuthorizatedGuard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    loadChildren: () => import('./home/home.routes').then(m => m.ROUTES_LOGIN)
  },
  {
    path: 'inicio',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page-content/page.routes').then( m => m.routes_initial)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.page').then( m => m.NotFoundPage)
  }
];
