import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {UsersService} from '../../shared/services/users.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {OrdersService} from '../../shared/services/orders.service';
import {Product} from '../../shared/models/product';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../shared/services/notification.service';
import {ContactInfo} from '../../shared/models/contact_info.model';
import {Router} from '@angular/router';
import {AddressesService} from '../../shared/services/addresses.service';
import {AddressDto, AddressListResponseDto} from '../../shared/dtos/responses/addresses/addresses.dto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  user: User;
  isLoggedIn: boolean;
  cartItems: Product[] = [];
  private subscriptions: Subscription[] = [];
  private checkoutForm: FormGroup;
  private addresses: AddressDto[];
  private selectedAddress: AddressDto;

  constructor(private usersService: UsersService, private ordersService: OrdersService, private shoppingCartService: ShoppingCartService,
              private fb: FormBuilder, private notificationService: NotificationService, private addressesService: AddressesService,
              private router: Router) {
    this.user = new User({});
    this.usersService.getUser().subscribe(user => {
      this.user = user;
      if (user !== null) {
        this.isLoggedIn = true;
        this.addressesService.fetchAll().subscribe(res => {
          if (res.success) {
            this.addresses = (res as AddressListResponseDto).addresses;
          }
        }, err => {
          debugger;
        });
      } else {
        this.isLoggedIn = false;
      }

    });

    this.subscriptions.push(this.shoppingCartService.getCart().subscribe(cart => {
      if (cart !== null) {

        this.cartItems = cart.cartItems;
        console.log(this.cartItems);
      }
    }));

    this.createForm();
  }

  ngOnInit() {
  }

  updateUserDetails(form: NgForm) {
    const data = form.value;

    data['email'] = this.user.email;
    data['username'] = this.user.username;

    console.log('Data: ', data);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private createForm() {
    this.checkoutForm = this.fb.group({
      firstName: [this.user.first_name, [Validators.required, Validators.minLength(2)]],
      lastName: [this.user.last_name, [Validators.required, Validators.minLength(2)]],
      username: [this.user.username, [Validators.required, Validators.minLength(2)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      streetAddress: [this.user.address, [Validators.required, Validators.minLength(2)]],
      city: [this.user.city, [Validators.required, Validators.minLength(2)]],
      country: [this.user.country, [Validators.required, Validators.minLength(2)]],
      zipCode: [this.user.zipCode, [Validators.required, Validators.minLength(2)]],
      cardNumber: ['', []],
    });
  }

  public submitCheckout(): void {
    if (this.checkoutForm.valid) {
      let checkoutObservable;
      if (this.selectedAddressUnchanged()) {
        checkoutObservable = this.ordersService.createOrderwithNewAddress(this.cartItems, new ContactInfo(this.checkoutForm.value));
      } else {
        checkoutObservable = this.ordersService.createOrderReusingAddress(this.cartItems, this.selectedAddress.id);
      }
      checkoutObservable.subscribe(res => {

        if (res.success) {
          this.router.navigate(['/']);
        }
      }, err => {
        debugger;
      });
    }
  }

  selectedAddressUnchanged() {
    return this.selectedAddress
      && this.selectedAddress.first_name === this.checkoutForm.value.firstName
      && this.selectedAddress.last_name === this.checkoutForm.value.lastName
      && this.selectedAddress.street_address === this.checkoutForm.value.streetAddress
      && this.selectedAddress.city === this.checkoutForm.value.city
      && this.selectedAddress.country === this.checkoutForm.value.country
      && this.selectedAddress.zip_code === this.checkoutForm.value.zipCode;
  }

  onAddressChanged($event) {
    const address = this.addresses.find(a => String(a.id) === $event.target.value);
    this.selectedAddress = address;
    this.checkoutForm.patchValue({
      firstName: address.first_name,
      lastName: address.last_name,
      username: this.isLoggedIn ? this.user.username : '',
      email: this.isLoggedIn ? this.user.email : '',
      streetAddress: address.street_address,
      city: address.city,
      country: address.country,
      zipCode: address.zip_code,
    });
  }
}
