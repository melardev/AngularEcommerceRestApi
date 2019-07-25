import {LoginComponent} from './login/login.component';
import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';

export const AuthRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];
