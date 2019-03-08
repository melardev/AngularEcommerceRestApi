import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'cart',
    loadChildren: './cart/cart.module#CartModule',
  },
  {
    path: 'products', loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'orders', loadChildren: './orders/orders.module#OrdersModule'
  },
  {
    path: 'addresses', loadChildren: './addresses/addresses.module#AddressesModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
