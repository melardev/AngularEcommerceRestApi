import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartRouter} from './cart.routing';
import {RouterModule} from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyCartComponent} from './my-cart/my-cart.component';
import {CartSummaryComponent} from './cart-summary/cart-summary.component';
import {CartSummaryActionsComponent} from './cart-summary-actions/cart-summary-actions.component';

@NgModule({
  declarations: [MyCartComponent, CartSummaryComponent, CartSummaryActionsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CartRouter
  ],
  exports: [CartSummaryComponent]
})
export class CartModule {
}
