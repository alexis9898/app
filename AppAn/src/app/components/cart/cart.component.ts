import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart-service";
import { Cart } from "src/app/models/cart";
import { Product } from "src/app/models/product";
import { HttpClient } from '@angular/common/http';
@Component({
  selector:'cart',
  templateUrl:'./cart.component.html',
  styleUrls: ['./cart.component.css'],

})

export class CartComponent{

  // public cart:Array<Cart<Product>> = [];
  public cart1:Array<Product> = [];
  // public cart1:Array<Product> = [];

  constructor(
    public cartService: CartService,
  ) {}

  @ViewChild('listEl') cartEl: ElementRef;
  minClassCart='';
  hide='';

  ngOnInit() {
    // this.cartService.getAllProductsCart().subscribe();
    this.cartService.getAllProductsCart();
    const sub = this.cartService.MyShoppingList1.subscribe((prods) => {
      this.cart1 = prods;
      console.log(prods);
    });
    setTimeout(()=>{
      const width=this.cartEl.nativeElement.offsetWidth;
      console.log(this.cartEl.nativeElement.offsetWidth);
      if(width<500){
        this.minClassCart='cart-min';
      }
    },10);
  }



  removeCart1(p2buy:Product){
    let index=this.cart1.findIndex(product=>product._id===p2buy._id);
    this.cart1.splice(index,1);
    this.cartService.MyShoppingList1.next(this.cart1);
  }

  hideOrShow(){
    console.log(this.hide);
    if(!this.hide){
      this.hide='hide';
      console.log('aa');
    }else{
      this.hide='';
    }
  }

  classList(item:any){
    console.log(item);
  }
  quantity(obj:any,p:Product){
    p.quantity= obj.value
    console.log(p.quantity);
    // obj.innerhtml=12;
  }
  // constructor(private _router:Router,public _CartService:CartService ){}
}
