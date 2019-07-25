import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {AdminGuard} from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'create',
    component: ProductCreateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':slug',
    component: ProductDetailsComponent
  },

];

export const ProductsRouter = RouterModule.forChild(routes);
