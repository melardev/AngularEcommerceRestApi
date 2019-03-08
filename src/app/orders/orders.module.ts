import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutComponent} from './order-create/checkout.component';
import {OrderListComponent} from './order-list/order-list.component';
import {RouterModule} from '@angular/router';
import {orderRoutes} from './orders.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartModule} from '../cart/cart.module';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [CheckoutComponent, OrderListComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(orderRoutes),
    ReactiveFormsModule,
    CartModule,
  ]
})
export class OrdersModule {
}
