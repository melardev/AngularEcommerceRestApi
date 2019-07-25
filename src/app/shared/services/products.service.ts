import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';
import {catchError, map, retry, tap} from 'rxjs/operators';

import {ShoppingCart} from '../models/shopping-cart.model';
import {ShoppingCartService} from './shopping-cart.service';
import {Comment} from '../models/comment.model';
import {NotificationService} from './notification.service';
import {ProductDto, ProductListResponseDto} from '../dtos/responses/products/products.dto';
import {BaseAppDtoResponse, ErrorAppDtoResponse} from '../dtos/responses/shared/base.dto';
import {PaginatedRequestDto} from '../dtos/requests/base.dto';
import {ProductLocalDto} from '../dtos/local/products.dto';
import {ErrorResult, SuccessResult} from '../dtos/local/base';
import {buildErrorObservable} from '../utils/net.utils';


let CREATED = false;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productList: Product[];
  products: ProductListResponseDto;
  private readonly baseUrl: string;

  productsBehaviourSubject = new BehaviorSubject<ProductListResponseDto>(this.products);
  private lastUpdatedApiResponseForAll: number;
  private lastUpdatedApiResponseForEach: Object[];

  public cartSnapshot: ShoppingCart;
  public defaultPagination: PaginatedRequestDto;
  private lastPaginatedRequest: PaginatedRequestDto = {page: 0, pageSize: 0};

  public constructor(private httpClient: HttpClient, private shoppingCartService: ShoppingCartService,
                     private notificationService: NotificationService) {
    if (CREATED) {
      alert('Two instances of the same ProductsService');
      return;
    }
    CREATED = true;
    this.defaultPagination = {
      page: 1,
      pageSize: 6
    };
    this.baseUrl = environment.urls.products;
    // subscribe to shopping cart
    this.shoppingCartService.getCart().subscribe(cart => {
      this.cartSnapshot = cart;
    });
  }


  private httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };


  getAllProducts(query: PaginatedRequestDto = this.defaultPagination):
    Observable<ProductListResponseDto | ErrorResult> {
    // If products-api null or length is 0 or last time fetched more than 20 seconds then
    if (this.products == null || this.lastPaginatedRequest.page !== query.page || this.lastPaginatedRequest.pageSize !== query.pageSize
      || this.products.products.length === 0
      || ((new Date().getTime() - this.lastUpdatedApiResponseForAll) > 20 * 1000)) {
      this.httpClient.get<ProductListResponseDto | ErrorAppDtoResponse>(`${this.baseUrl}?page=${query.page}&page_size=${query.pageSize}`)
        .pipe(
          retry(2),
          tap((response: any) => {
            console.log('canceled:false');
            const isCanceled = false;
          })).subscribe(
        res => {
          this.lastPaginatedRequest = query;
          console.log('success:' + res.success);
          if (res.success && res.products) {
            this.productList = res.products;
            this.products = res;
            this.lastUpdatedApiResponseForAll = new Date().getTime();
            this.notifyDataChanged();
          }

          return res as ProductListResponseDto;
        }, err => {
          this.notificationService.dispatchErrorMessage(err);
          return buildErrorObservable(err);
        });
    } else {
      console.log('[+] Products not fetched because the condition has not been met(you recently fetched the same page and pageSize)');
    }

    // always return the behaviourSubject, this guy will notify the observers for any update
    return this.productsBehaviourSubject.asObservable();
  }

  getById(id: string): Observable<ProductDto> {
    return this.httpClient.get<ProductDto>(`${this.baseUrl}/by_id/${id}`);
  }

  getBySlug(slug: string): Observable<ProductLocalDto | ErrorResult> {
    return this.httpClient.get<ProductDto>(`${this.baseUrl}/${slug}`).pipe(
      map(res => {
        // TODO: Fix this
        if (this.cartSnapshot == null) {
          this.cartSnapshot = this.shoppingCartService.getCartSnapshot();
          debugger;
        }
        this.notificationService.dispatchSuccessMessage('Retrieved product details');
        const product = res as ProductLocalDto;
        const responseSlug = res.slug;
        const id = res.id;
        const cartItem = this.cartSnapshot.cartItems.find(ci => ci.id === id && ci.slug === responseSlug);
        product.isInCart = !!cartItem;
        return product;
      }),
      catchError(err => {
        this.notificationService.dispatchErrorMessage(err.message);
        return buildErrorObservable(err);
      })
    );
  }

  createProduct(product: Product, images: FileList): Observable<ProductDto | ErrorResult> {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('images[]', images[i], images[i]['name']);
    }

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('stock', product.stock.toString());
    formData.append('price', product.price.toString());

    return this.httpClient.post<ProductDto | ErrorResult>(this.baseUrl, formData).pipe(
      map(res => {
        delete res.success;
        this.notificationService.dispatchSuccessMessage(res.full_messages.join('<br/>'));
        delete res.full_messages;
        return res as ProductDto;
      }),
      catchError(err => {
        this.notificationService.dispatchErrorMessage(err.message);
        return buildErrorObservable(err);
      })
    );
  }

  update(product: Product): Observable<ProductDto | any> {
    return this.httpClient.put<ProductDto>(this.baseUrl, product /*, this.httpOptions */)
      .pipe(retry(5), map(res => {
        if (res.success) {
          const at = this.products.products.find(t => t.id === res.id);
          // Update the products-api array
          this.products.products = this.products.products.map(t => t.id === product.id ? product : t);
        }
        return res; // || {};
      }), catchError(err => {
        return err;
      }));
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.baseUrl).pipe(
      map(res => {
        return res;
        // this.products-api = [];
        // return this.productsBehaviourSubject;
      }), catchError(err => {
        return err;
      }));
  }

  deleteById(id: number) {
    return this.httpClient.delete<Product>(`${this.baseUrl}/${id}`, /*this.httpOptions*/);
  }

  private notifyDataChanged() {
    this.productsBehaviourSubject.next(this.products);
  }

  public unusedGetAll(): Observable<Product[]> {
    // TODO: Return an observable but before assigns this.cart
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  /*
    unusedGetCached(): Observable<Product[]> | any {
      return new Observable<Product[]>((obs: Observer) => {
        obs.next(this.products);
      });
    }

    unusedGetProductCached(id: string): Observable<Product> {
      return new Observable<Product>((obs: Observer<Product>) => {
        this.unusedGetCached().subscribe(products => {
          const product = products.find((p) => p.id === id);
          obs.next(product);
          obs.complete();
        });
      });
    }
    */
  submitComment(comment: Comment, slug: string): Observable<BaseAppDtoResponse> {
    return this.httpClient.post<BaseAppDtoResponse>(`${environment.urls.products}/${slug}/comments`, comment).pipe(
      map(res => {
        this.notificationService.dispatchSuccessMessage('Comment submitted');
        return res;
      }), catchError(err => {
        console.log(err);
        this.notificationService.dispatchErrorMessage(err);
        return [];
      }));
  }

  deleteComment(id: number): Observable<SuccessResult | ErrorResult> {
    if (id == null) {
      this.notificationService.dispatchErrorMessage('Invalid comment id provided to delete');
      return buildErrorObservable('Invalid comment id provided to delete');
    }
    return this.httpClient.delete<BaseAppDtoResponse>(`${environment.urls.comments}/${id}`).pipe(
      map(res => {
        this.notificationService.dispatchSuccessMessage('Comment deleted');
        return res;
      }, catchError(err => {
        this.notificationService.dispatchErrorMessage(err);
        return buildErrorObservable(err);
      }))
    );
  }
}

