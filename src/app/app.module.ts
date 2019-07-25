import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {SharedModule} from './shared/shared.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProductsService} from './shared/services/products.service';
import {UsersService} from './shared/services/users.service';
import {LocalStorageService} from './shared/services/local-storage.service';
import {ShoppingCartService} from './shared/services/shopping-cart.service';
import {AuthenticationGuard} from './shared/guards/authentication.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtHttpInterceptor} from './shared/interceptors/jwt-http.interceptor';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    // Angular Modules
    BrowserModule,

    // 3party


    // My Modules
    AppRoutingModule,
    SharedModule,
  ],
  exports: [PageNotFoundComponent],
  providers: [
    ProductsService,
    UsersService,
    LocalStorageService,
    ShoppingCartService,

    // TODO: place it in shared module and check if still singleton
    AuthenticationGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
