import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from "./components/product-list/products.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { NewsComponent } from "./components/news/news.component";
import { NewsDetailsComponent } from "./components/news-details/news-details.component";
import { ChekOutComponent } from "./components/chek-out/chek-out.component";
import { CartComponent } from "./components/cart/cart.component";
import { CalculatorComponent } from "./components/calculator/calculator.component";
import { CategoryComponent } from "./components/category/category.component";
import { ManagementComponent } from "./components/management/management.component";
import { ManagementAddComponent } from "./components/management-add/management-add.component";
import { ManagementChangeComponent } from "./components/management-change/management-change.component";
import { ProductComponent } from "./components/product/product.component";

const _routes:Routes=[
  { path:'', redirectTo:'products' , pathMatch:'full' }, //redirectTo => move to path (named 'products') (the defult page at log in to page)
  { path:'products', component:ProductsComponent  },
  { path:'product', component:ProductComponent  },
  { path:'aboutus', component:AboutUsComponent  },
  { path:'cart', component:CartComponent },
  { path:'calculator', component:CalculatorComponent },
  { path:'category', component:CategoryComponent },
  { path:'management', component:ManagementComponent },
  { path:'management-add-product', component:ManagementAddComponent },
  { path:'management-change-product', component:ManagementChangeComponent },
  // { path:'chek-out', component:ChekOutComponent },
  { path:'news', children:[
    { path:'', component:NewsComponent},
    { path:':id', component: NewsDetailsComponent},
  ]},
  { path:'**', redirectTo:'products' }, //Error 404
];

@NgModule({
  imports:[RouterModule.forRoot(_routes)],
  exports:[RouterModule]
})

export class AppRoutingMoudle{

}

