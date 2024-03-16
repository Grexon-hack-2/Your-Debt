import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'inicio',
      loadComponent: () => import('./home/home.page').then(m => m.HomePage)
    },
  {
    path: 'pagina-inicial',
    loadComponent: () => import('./init-page/init-page.page').then( m => m.InitPagePage)
  }
];
