import {RouterModule, Routes} from '@angular/router';
import {MyCartComponent} from './my-cart/my-cart.component';

const routes: Routes = [
  {
    path: '', component: MyCartComponent
  },
];

export const CartRouter = RouterModule.forChild(routes);
