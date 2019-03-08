import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-cart-summary-actions',
  templateUrl: './cart-summary-actions.component.html',
  styleUrls: ['./cart-summary-actions.component.css']
})
export class CartSummaryActionsComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
