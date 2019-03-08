import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Router} from '@angular/router';
import {Product} from '../../shared/models/product';
import {Category} from '../../shared/models/category.model';
import {ProductsService} from '../../shared/services/products.service';
import {UsersService} from '../../shared/services/users.service';
import {ProductListResponseDto} from '../../shared/dtos/responses/products/products.dto';
import {PaginatedRequestDto} from '../../shared/dtos/requests/base.dto';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Observable<ProductListResponseDto | any>;
  productList: Product[];
  categories: Category[];
  selectedCategory: string;
  private isAdmin: boolean;
  private errors: any;

  constructor(private productsService: ProductsService, public usersService: UsersService,
              private router: Router) {
    this.usersService.isAdminAsync().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnInit() {
    this.products = this.productsService.getAllProducts();

    this.products.subscribe(res => {
      console.log('I got something');
      if (res && res.success) {
        if (res.products) {
          this.productList = res.products;
        }
        if (res.categories) {
          this.categories = res.categories;
        }
      }
      // this.tags = res.tags;
    }, err => {
      console.error(err);
    });

  }


  addOrUpdateCart(product: Product) {

  }

  edit(id: string) {
    this.productsService.getById(id).subscribe(product => {
      console.log(product);
    });
  }

  getDetails(product: Product) {
    this.productsService.getById(product.id).subscribe(res => {
      if (res.success) {
        this.router.navigate(['simple_todos_api/', res.id]);
      }
      console.log('fetched ' + res.id);
    });
  }

  onLoadMore(query: PaginatedRequestDto) {
    this.productsService.getAllProducts(query); // no need to subscribe, we render using observables so angular takes care for us
  }
}
