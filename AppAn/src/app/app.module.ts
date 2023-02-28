import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingMoudle } from './app-routing-moduls';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/heder/header.component';
import { ProductsComponent } from './components/product-list/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { ChekOutComponent } from './components/chek-out/chek-out.component';

import { CartService } from './services/cart-service';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';

import { FilterProductsPipe } from './pipe/filterProductsPipe';
import { SortProductsPipe } from './pipe/ProductsSort';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CategoryComponent } from './components/category/category.component';
import { ManagementComponent } from './components/management/management.component';
import { ManagementAddComponent } from './components/management-add/management-add.component';
import { ManagementChangeComponent } from './components/management-change/management-change.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    AboutUsComponent,
    NewsComponent,
    NewsDetailsComponent,
    CartComponent,
    ChekOutComponent,
    FilterProductsPipe,
    SortProductsPipe,
    CalculatorComponent,
    CategoryComponent,
    ManagementComponent,
    ManagementAddComponent,
    ManagementChangeComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingMoudle,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
