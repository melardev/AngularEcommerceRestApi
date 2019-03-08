import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/models/product';

import {ProductsService} from '../../shared/services/products.service';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {UsersService} from '../../shared/services/users.service';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../shared/services/notification.service';
import {Comment} from '../../shared/models/comment.model';
import {CommentSubmittedResponse} from '../../shared/dtos/responses/comments/comment-submitted.response';
import {ShoppingCart} from '../../shared/models/shopping-cart.model';
import {User} from '../../shared/models/user';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product;

  private isLoggedIn: boolean;
  private subscriptions: Subscription[] = [];
  public commentForm: FormGroup;
  private quantity = 0;
  private cart: ShoppingCart;
  private currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private usersService: UsersService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
  ) {
    this.product = new Product();
    this.subscriptions.push(this.usersService.getUser().subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    }));

    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(2)]]
    });

  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      const slug = params['slug']; // (+) converts string 'id' to a number
      this.getProductDetail(slug);
    }));
    this.subscriptions.push(this.shoppingCartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.updateQuantityValue();
      // we could actually make the check here with :
      // const cartItem = this.cart.cartItems.find(ci => ci.slug === this.route.snapshot.params.slug);
      // which does not require the product to be fetched from the remote server to know if it is in cart and
      // the quantity.
    }));
  }

  updateQuantityValue() {
    const cartItem = this.cart.cartItems.find(ci => ci.id === this.product.id);
    if (cartItem) {
      this.quantity = cartItem.quantity;
    } else {
      this.quantity = 1;
    }
  }

  getProductDetail(slug: string) {

    this.productService.getBySlug(slug).subscribe(res => {
      // this.spinnerService.hide();

      if (res.success) {
        this.product = new Product(res);
        this.updateQuantityValue();
      }

    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  addOrUpdateCart(count: string | number) {
    if (this.product == null) {
      return;
    }
    // to avoid the type checking error, set as string, it would work anyways though
    const quantity = parseInt(count as string, 10);
    if (quantity <= 0 && this.product.isInCart) {
      this.shoppingCartService.removeFromCart(this.product);
      this.product.isInCart = false;
      return;
    } else if (this.product.isInCart) {
      this.product = this.shoppingCartService.updateQuantity(this.product, quantity);
    } else {
      this.product = this.shoppingCartService.addToCart(this.product, quantity);
    }

    this.product.isInCart = true;
  }


  submitComment() {
    if (this.commentForm.valid) {
      this.notificationService.dispatchSuccessMessage('Submitting Login Form');
      const {content} = this.commentForm.value;
      const comment = new Comment({productId: this.product.id, content: content, id: null});
      console.log(this.product.slug);
      this.productService.submitComment(comment, this.product.slug).subscribe(res => {
        if (res.success) {
          // Clear the text area
          this.commentForm.patchValue({content: ''});

          if (this.product.comments == null) {
            this.product.comments = [];
          }
          const response = res as CommentSubmittedResponse;
          console.log(response);
          this.product.comments.push(new Comment({
            id: response.id,
            username: response.username,
            content: response.content,
            createdAt: response.created_at,
          }));
        }
      });
    }
  }

  deleteComment(comment: Comment) {
    this.productService.deleteComment(comment.id).subscribe(res => {
      if (res.success) {
        this.product.comments = this.product.comments.filter(cachedComments => cachedComments.id !== comment.id);
      }
    });
  }
}
