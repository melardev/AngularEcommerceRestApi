import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':slug',
    component: ProductDetailsComponent
  },
];

export const ProductsRouter = RouterModule.forChild(routes);
