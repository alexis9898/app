import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart-service";
import { Cart } from "src/app/models/cart";
import { Product } from "src/app/models/product";
@Component({
  selector:'cart',
  templateUrl:'./cart.component.html',
  styleUrls: ['./cart.component.css'],

})

export class CartComponent{

  public cart:Array<Cart<Product>> = [];
  public cart1:Array<Product> = [];
  // public cart1:Array<Product> = [];

  constructor(
    public cartService: CartService,
  ) {}

  ngOnInit() {
    // this.cartService.getAllProductsCart().subscribe();
    const sub = this.cartService.MyShoppingList1.subscribe((prods) => {
      this.cart1 = prods;
      console.log(prods);
    });
  }

  removeCart1(p2buy:Product){
    let index=this.cart1.findIndex(product=>product._id===p2buy._id);
    this.cart1.splice(index,1);
    this.cartService.MyShoppingList1.next(this.cart1);
  }

  quantity(obj:any,p:Product){
    p.quantity= obj.value
    console.log(p.quantity);
    // obj.innerhtml=12;
  }
  // constructor(private _router:Router,public _CartService:CartService ){}
}
