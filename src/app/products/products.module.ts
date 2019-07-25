import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductsRouter} from './products.routing';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ProductCreateComponent} from './product-create/product-create.component';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {AdminGuard} from '../shared/guards/admin.guard';

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    SharedModule,
    ProductsRouter
  ],
  providers: [AdminGuard]
})
export class ProductsModule {
}
