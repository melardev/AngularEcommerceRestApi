import {Routes} from '@angular/router';
import {CheckoutComponent} from './order-create/checkout.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailsComponent} from './order-details/order-details.component';


export const orderRoutes: Routes = [
  {
    path: 'create',
    component: CheckoutComponent
  },
  {
    path: '', redirectTo: '/orders/list', pathMatch: 'full'
  },
  {
    path: 'list', component: OrderListComponent
  }
  ,
  {
    path: ':id', component: OrderDetailsComponent
  }
];
