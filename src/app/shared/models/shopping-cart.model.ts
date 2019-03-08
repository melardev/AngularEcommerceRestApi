import {Product} from './product';

export class ShoppingCart {
  cartItems: Product[];
  created: number;
  lastUpdated: number;

  constructor() {
    this.cartItems = [];
    this.created = Date.now();
    this.lastUpdated = Date.now();
  }
}
