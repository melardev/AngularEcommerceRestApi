// Local Shopping Cart for other prject
import {core} from '@angular/compiler';

/*import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {ShoppingCart} from '../models/shopping-cart.model';
import {Product} from '../models/cart';
import {Injectable} from '@angular/core';


const CART_KEY = 'cart';

@Injectable()
export class ShoppingCartService {


  private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private cart: Product[];

  public constructor(private storageService: StorageService, private productService: ProductDataService, private deliveryOptionsService: DeliveryOptionDataService) {
    this.storage = this.storageService.get();
    this.productService.all().subscribe(
      (cart) => this.cart = cart);
    this.deliveryOptionsService.all()
      .subscribe((options) => this.deliveryOptions = options);

    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public addItem(cart: Product, stock: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === cart.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = cart.id;
      cart.items.push(item);
    }

    item.stock += stock;
    cart.items = cart.items.filter((CartItem) => CartItem.stock > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

  private calculateCart(cart: ShoppingCart): void {
    cart.itemsTotal = cart.items
      .map((item) => item.stock * this.cart.find((p) => p.id === item.productId).price)
      .reduce((previous, current) => previous + current, 0);
    cart.deliveryTotal = cart.deliveryOptionId ?
      this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price : 0;
    cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  private save(cart: ShoppingCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }

  private dispatch(cart: ShoppingCart): void {
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
          //empty
        }
      });
  }
}
*/
