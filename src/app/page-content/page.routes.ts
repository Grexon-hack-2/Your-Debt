import { Routes } from '@angular/router';
import { DeudoresPage } from './deudores/deudores.page';
import { CapitalTotalPage } from './capital-total/capital-total.page';
import { ProductosPage } from './productos/productos.page';
import { InitialAppPage } from './initial-app/initial-app.page';
import { OthersDebtsPage } from './others-debts/others-debts.page';


export const routes_initial: Routes = [
      {
        path: '',
        component: InitialAppPage
      },
      {
        path: 'deudores',
        loadChildren: () => import('./deudores/deudor.routes').then(m => m.routes_debts)
      },
      {
        path: 'capital-total',
        component: CapitalTotalPage
      },
      {
        path: 'productos',
        component: ProductosPage
      },
      {
        path: 'others-debts',
        component: OthersDebtsPage
      }
  
];