import {LoginComponent} from './login/login.component';
import {Routes} from '@angular/router';
import {IndexComponent} from './index.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';

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
