import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {ContactInfo} from '../models/contact_info.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {NotificationService} from './notification.service';

import {OrderListDto} from '../dtos/responses/orders/order-list.dto';

import {OrderDetailsDto} from '../dtos/responses/orders/order-details.response';
import {ErrorResult} from '../dtos/local/base';
import {buildErrorObservable} from '../utils/net.utils';
import {ShoppingCartService} from './shopping-cart.service';

let CREATED = false;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient, private cartService: ShoppingCartService, private notificationService: NotificationService) {
    if (CREATED) {
      alert('Two instances of the same OrdersService');
      return;
    }
    CREATED = true;
  }

  createOrderwithNewAddress(products: Product[], contactInfo: ContactInfo): Observable<OrderDetailsDto | ErrorResult> {
    const contactData = {
      // TODO: we are placing redundant fields, fix.
      ...contactInfo,
      first_name: contactInfo.firstName,
      last_name: contactInfo.lastName,
      zip_code: contactInfo.zipCode,
      card_number: contactInfo.cardNumber,
    };

    return this.handleCreateOrderPromise(this.httpClient.post<OrderDetailsDto | ErrorResult>(`${environment.urls.orders}`, {
      cart_items: products,
      ...contactData
    }));
  }

  createOrderReusingAddress(cartItems: Product[], addressId: string): Observable<OrderDetailsDto | ErrorResult> {
    return this.handleCreateOrderPromise(this.httpClient.post<OrderDetailsDto>(`${environment.urls.orders}`, {
      cart_items: cartItems,
      address_id: addressId,
    }));
  }

  private handleCreateOrderPromise(orderPromise: Observable<OrderDetailsDto | ErrorResult>): Observable<OrderDetailsDto | ErrorResult> {
    return orderPromise.pipe(map(res => {
      if (res.success) {
        this.notificationService.dispatchSuccessMessage('Order placed successfully');
        this.cartService.clearCart();
      }
      return res;
    }), catchError(err => {
      this.notificationService.dispatchErrorMessage(err.message);
      return buildErrorObservable(err);
    }));
  }

  getMyOrders(): Observable<OrderListDto> {
    return this.httpClient.get<OrderListDto>(environment.urls.orders).pipe(map(res => {
      if (res.success) {
        const response = res as OrderListDto;
        console.log(res);
        this.notificationService.dispatchSuccessMessage('Retrieved ' + response.page_meta.current_items_count);
      }
      return res;
    }, catchError(err => {
      this.notificationService.dispatchErrorMessage(err);
      return [];
    })));
  }

  getOrder(id: number): Observable<OrderDetailsDto> {
    return this.httpClient.get<OrderDetailsDto>(`${environment.urls.orders}/${id}`)
      .pipe(map(res => {
        if (res.success) {
          const response = res as OrderDetailsDto;
        }
        return res;
      }), catchError(err => {
        this.notificationService.dispatchErrorMessage(err);
        return [];
      }));
  }
}
