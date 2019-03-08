import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../../shared/models/shopping-cart.model';
import {Product} from '../../shared/models/product';
import {ProductsService} from '../../shared/services/products.service';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cart: Observable<ShoppingCart>;
  cartItems: Product[];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = 'No Products Found in Cart';
  messageDescription = 'Please, Add Products to Cart';
  private myCartProductsFrom: FormGroup;
  private totalAmount: number;

  constructor(private productService: ProductsService, private shoppingCartService: ShoppingCartService) {
    this.cart = this.shoppingCartService.getCart();
    this.cart.subscribe(cart => {
      this.cartItems = cart.cartItems;
      this.totalAmount = cart.cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity * cartItem.price, 0);
    });

    this.createForm();
  }


  ngOnInit() {

  }

  removeCartProduct(product: Product) {
    this.shoppingCartService.removeFromCart(product);
  }

  updateQuantities($event) {
    $event.preventDefault();
    console.log(this.myCartProductsFrom.value);

    // ES6 syntax same as for(var key in form){form[key]}
    for (const [id, quantity] of Object.entries(this.myCartProductsFrom.value)) {
      const cartItem = this.cartItems.find(ci => ci.id === id);
      this.shoppingCartService.updateQuantity(cartItem, Number(quantity));
    }
  }

  private createForm() {
    const group: { [key: string]: AbstractControl } = {};
    this.cartItems.forEach(product => {
      group[product.id] = new FormControl(product.quantity, [Validators.required, Validators.min(0)]);
    });
    this.myCartProductsFrom = new FormGroup(group);
  }
}
