import { Component, NgModule, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart-service";
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { Product } from "src/app/models/product";
import { take, tap } from "rxjs";
import { Order } from "src/app/models/order";
import { NgForm } from '@angular/forms';
// import { ngForm}

@Component({
  selector:'app-chek-out',
  templateUrl:'./chek-out.component.html'
})

export class ChekOutComponent{

  public cart1:Array<Product> = [];
  constructor(private _router:Router,public cartService:CartService, private http:HttpClient){}

  @ViewChild('f') formSubmit:NgForm | undefined;
  ngOnInit() {
    // this.cartService.getAllProductsCart().subscribe();
    this.cartService.MyShoppingList1.subscribe((prods) => {
      this.cart1 = prods;
      console.log(prods);
    });
  }


  addOrdertoCustomer(order:any){
    return this.http.post<Order>("http://localhost:3000/api/orders",order).pipe(
        take(1),
        tap((orderId)=>{
          // if(!error.. ){
            console.log(`order number:${orderId} is added`);
            this.cartService.MyShoppingList1.next([]);;
          // }

        }),
      );
  }

  SubmitOrder(){
      console.log(this.formSubmit);

      // const order={
      //   customerId:"638a0bf1f95e08615bab069f",
      //   productsCart:this.cart1
      // }
      // this.addOrdertoCustomer(order).subscribe();
  }

  test(o:any){
    console.log(o);
  }

}
