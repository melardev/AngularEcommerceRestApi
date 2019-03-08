import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressListComponent} from './address-list/address-list.component';
import {AddressCreateComponent} from './address-create/address-create.component';
import {AddressDetailsComponent} from './address-details/address-details.component';
import {RouterModule, Routes} from '@angular/router';

const orderRoutes: Routes = [
  {
    path: 'create',
    component: AddressCreateComponent
  },
  {
    path: '', redirectTo: '/addresses/list', pathMatch: 'full'
  },
  {
    path: 'list', component: AddressListComponent
  }
  ,
  {
    path: ':id', component: AddressDetailsComponent
  }
];

@NgModule({
  declarations: [AddressListComponent, AddressCreateComponent, AddressDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes),
  ]
})
export class AddressesModule {
}
