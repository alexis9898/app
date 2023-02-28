import {  Injectable } from "@angular/core";
import { Cart } from '../models/cart';
import { Product } from "../models/product";
import { HttpClient } from '@angular/common/http';
import {
  map,
  Observable,
  take,
  tap,
  Subject,
  delay,
  BehaviorSubject,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class CartService{

  constructor(private http: HttpClient) {}
  MyShoppingList = new BehaviorSubject<Cart<Product>[]>([]);
  MyShoppingList1 = new BehaviorSubject<Product[]>([]);


  // {withCredentials: true} -Header-foe-session
  getAllProductsCart() {
    return this.http.get<Cart<Product>[]>('http://localhost:3000/api/products-cart').pipe(
      take(1),
      tap((cart) => {
        this.MyShoppingList.next(cart);
      })
      // ,delay(3000),
      // tap(() => {
      //   this.productsChange.next([]);
      // })
    );
  }

  addProductToCart(product:Product){
    return this.http.post<Cart<Product>[]>('http://localhost:3000/api/add-product-to-cart',{_id:product._id}).pipe(
      take(1),
      tap((cart) => {
        this.MyShoppingList.next(cart);
      })
    );
  }

  removeProductFromCart(product:Product){
    return this.http.post<[]>('http://localhost:3000/api/remove-product-from-cart',{_id:product._id}).pipe(
      take(1),
      tap((cart) => {
        this.MyShoppingList.next(cart);
      })
    );
  }


  // MyShoppingList:Array<Cart>=[];

  totalPrice(){
    let total=0;
    let list=this.MyShoppingList1.subscribe((products)=>{
      for (let i = 0; i < products.length; i++) {
        total+= products[i].price;
      }
    });
    return total;
  }
}
