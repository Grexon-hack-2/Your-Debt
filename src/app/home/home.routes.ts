import { Routes } from '@angular/router';
import { HomePage } from './home.page';
import { RegisterPage } from './register/register.page';

export const ROUTES_LOGIN: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
];
