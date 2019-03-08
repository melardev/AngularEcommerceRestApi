import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Product} from '../../shared/models/product';


@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit, OnChanges {

  @Input() cartItems: Product[];

  totalValue = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.cartItems;

    const cartItems: Product[] = dataChanges.currentValue;
    this.totalValue = 0;
    cartItems.forEach(product => {
      console.log(
        'Adding: ' + product.name + ' $ ' + product.price
      );
      this.totalValue += product.price * product.quantity;
    });
  }

  ngOnInit() {
  }


}
