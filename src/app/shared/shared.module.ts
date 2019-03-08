import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CarouselComponent} from './components/carousel/carousel.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    CarouselComponent,
    HeaderComponent,
    FooterComponent,
    PaginationComponent
  ],
  exports: [
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
  ],
  providers: []
})
export class SharedModule {
}
