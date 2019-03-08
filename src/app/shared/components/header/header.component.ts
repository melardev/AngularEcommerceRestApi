import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {UsersService} from '../../services/users.service';
import {Observable, Subscription} from 'rxjs';
import {ShoppingCart} from '../../models/shopping-cart.model';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private cart: Observable<ShoppingCart>;
  private message: string;
  private cartItemsLength: number;
  private isLoggedIn = false;
  private subscriptions: Subscription[] = [];
  private className: string;

  constructor(private usersService: UsersService, private cartService: ShoppingCartService,
              private notificationService: NotificationService) {

    this.cart = this.cartService.getCart();


    this.subscriptions.push(this.usersService.isLoggedInAsync().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      // this.isLoggedIn = !!(user && user.username && user.token);
    }));
    this.cart.subscribe(cart => {
      this.cartItemsLength = cart.cartItems.length;
    });
    this.notificationService.getNotifications().subscribe(notification => {
      if (notification == null) {
        return;
      }
      this.className = notification.type === 'success' ? 'alert alert-success' : 'alert alert-danger';
      this.message = notification.message;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.usersService.logout();
  }

  ngOnDestroy(): void {
    // TODO: Unsubscribe
  }

}
