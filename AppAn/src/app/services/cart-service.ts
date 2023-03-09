import {  Injectable } from "@angular/core";
import { Cart } from '../models/cart';
import { Product } from "../models/product";
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { ProductsService } from "./products.service";
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

  constructor(private http: HttpClient,private cookieService: CookieService, private productservice:ProductsService) {}
  // MyShoppingList = new BehaviorSubject<Cart<Product>[]>([]);
  MyShoppingList1 = new BehaviorSubject<Product[]>([]);
  cart:Cart[]=[];

  // {withCredentials: true} -Header-foe-session
  getAllProductsCart() {
    let cartStorage=localStorage.getItem('cart');
    if(!cartStorage){
      return null;
    }
    this.cart=JSON.parse( cartStorage); //{productId,amount}
    let productsCart:Product[]=[];

    for (let i = 0; i < this.cart.length; i++) {
      this.productservice.getOneProductsWithImages2(this.cart[i].productId).subscribe(prd=>{
        prd.quantity=this.cart[i].quantity;
        productsCart.push(prd);
        if(i===this.cart.length-1){
          console.log(productsCart);
          this.MyShoppingList1.next(productsCart);
        }
      });
    }
  }

  addProductToCart(product:Product){
    if(!this.cart){
      const cart=localStorage.getItem('cart');
        if(cart){
          this.cart=JSON.parse(cart);
        }else{
          this.cart=[];
        }
    }
    const index=this.cart.findIndex(prd=>prd.productId===product._id);
    if(index!==-1){
      this.cart[index].quantity=product.quantity;
    }else{
      this.cart.push({productId:product._id,quantity:product.quantity});
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.getAllProductsCart();
    // this.MyShoppingList1.next()
  }

  saveCart(productsList:Product[]){
    for (let i = 0; i < productsList.length; i++) {
      this.cart.push({productId:productsList[i]._id, quantity:productsList[i].quantity});
    }
    let cartStorage=JSON.stringify(this.cart);
    localStorage.setItem('cart', cartStorage);
    // this.MyShoppingList.next(cart);
  }

  removeProductFromCart(productsList:Product[], productId:string){
    let cartStorage=localStorage.getItem('cart');
    if(!cartStorage){
     return null;
    }
    let cart=JSON.parse(cartStorage);
  }

  removeCart(){
    localStorage.removeItem('cart');
    this.cart=[];
    this.MyShoppingList1.next([]);
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
