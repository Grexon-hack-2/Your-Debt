import { Routes } from '@angular/router';
import { DeudoresPage } from './initial-app/deudores/deudores.page';
import { CapitalTotalPage } from './initial-app/capital-total/capital-total.page';
import { ProductosPage } from './initial-app/productos/productos.page';
import { PageContentPage } from './page-content.page';


export const routes_initial: Routes = [
      {
        path: '',
        component: PageContentPage
      },
      {
        path: 'deudores',
        loadChildren: () => import('./initial-app/deudores/deudor.routes').then(m => m.routes_debts)
      },
      {
        path: 'capital-total',
        component: CapitalTotalPage
      },
      {
        path: 'productos',
        component: ProductosPage
      }
  
];