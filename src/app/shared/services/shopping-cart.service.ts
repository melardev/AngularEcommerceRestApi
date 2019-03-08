import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

import {Product} from '../models/product';
import {ShoppingCart} from '../models/shopping-cart.model';
import {catchError} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';


let CREATED = false;

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  BASE_URL = `${environment.urls.cart}`;

  private cartModel: ShoppingCart;
  private cartBehaviorSubject: BehaviorSubject<ShoppingCart>;

  private subscribers: any;
  private readonly cartKey = 'app_cart';

  constructor(private http: HttpClient, private storageService: LocalStorageService) {
    if (CREATED) {
      alert('Two instances of the same ShoppingCartService');
      return;
    }
    CREATED = true;
    this.cartBehaviorSubject = new BehaviorSubject(this.cartModel);
    this.getCartFromStorage();

  }

  private getCartFromStorage(): ShoppingCart {
    this.cartModel = (JSON.parse(window.localStorage.getItem(this.cartKey)) as ShoppingCart);
    if (!this.cartModel) {
      this.cartModel = new ShoppingCart();
    } else {
      // populate the isInCart flag which is not stored but it is required and used by other functions in this app
      this.cartModel.cartItems.forEach(ci => {
        ci.id = String(ci.id); // we have to do this because somehow the id is stored as an integer
        ci.isInCart = true;
      });
    }
    this.notifyDataSetChanged();
    return this.cartModel;
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  getCart(): Observable<ShoppingCart> {
    // return this.http.get(this.BASE_URL).pipe(catchError(this.formatErrors));
    return this.cartBehaviorSubject.asObservable();
  }

  updateCart(body: Object = {}): Observable<any> {
    alert('updateCart');
    return this.http.put(this.BASE_URL, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }


  addToCart(product: Product, quantity: number): Product {
    if (this.cartModel == null) {
      this.cartModel = this.getCartFromStorage();
    }

    let item = this.cartModel.cartItems.find((pr) => pr.id === product.id);
    if (item === undefined) {
      item = new Product();
      item.id = product.id;
      item.name = product.name;
      item.slug = product.slug;
      item.price = product.price;
      item.quantity = 0;
      item.isInCart = true;
    }

    this.cartModel.cartItems.push(item);
    item.quantity += quantity;
    this.commitCartTransaction();
    return item;
  }

  private commitCartTransaction() {
    this.saveCartToStorage();
    this.notifyDataSetChanged();
  }

  private saveCartToStorage(cart: ShoppingCart = this.cartModel) {
    this.storageService.set(this.cartKey, JSON.stringify(cart));
  }

  private notifyDataSetChanged() {
    this.cartBehaviorSubject.next(this.cartModel);
  }

  updateCartLocal(cartState: Object = {}) {

  }

  deleteCart(): Observable<any> {
    alert('delete Cart');
    return this.http.delete(this.BASE_URL).pipe(catchError(this.formatErrors));
  }

  checkout(): Observable<any> {
    const body = this.getCartFromStorage();
    return this.http.post(`${environment.urls.orders}`, body);
  }

  removeFromCart(product: Product) {
    if (this.cartModel === undefined) {
      this.cartModel = this.getCartFromStorage();
    }
    this.cartModel.cartItems = this.cartModel.cartItems
      .filter((cartItem) => cartItem.id !== product.id);
    this.commitCartTransaction();
  }

  getFavoritedProductsCount() {
    return 2;
  }

  updateQuantity(cartItem: Product, quantity: number): Product {
    if (cartItem == null || !cartItem.isInCart) {
      console.error('product not in cart');
      return null;
    }
    if (quantity <= 0) {
      this.removeFromCart(cartItem);
      return cartItem;
    }
    if (cartItem.quantity !== quantity) {
      cartItem.quantity = 0;
      const item = this.cartModel.cartItems.find((pr) => pr.id === cartItem.id);
      if (item == null) {
        debugger;
      }
      item.quantity = quantity;
      cartItem.quantity = quantity;
      this.commitCartTransaction();
      return item;
    }

    return null;
  }

  getCartSnapshot() {
    return this.cartModel;
  }

  clearCart() {
    this.cartModel = new ShoppingCart();
    this.saveCartToStorage(this.cartModel);
    this.notifyDataSetChanged();
  }

}

