import { Component, OnInit, Output } from '@angular/core';

import { CartService } from 'src/app/services/cart-service';

import { Product } from 'src/app/models/product';
import { ProductsService } from '../../services/products.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public products: Array<Product> = [];
  // public cart: Array<Cart<Product>> = [];
  public cart1: Array<Product> = [];
  option = 'row1';
  searchProduct!: string;
  sortingBy!: string;
  reverseClass='';

  sortListClass='';
  constructor(
    public cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.productsService.getAllProductsWithImages().subscribe();
    const sub = this.productsService.productsChange.subscribe((prods) => {
      // for (let i = 0;  i< prods.length; i++) {
      //   if(prods[i].images.length!==0){
      //     prods[i].images=JSON.parse(prods[i].images);
      //   }
      // }
      this.products = prods;
      for (let i = 0; i < this.products.length; i++) {
        this.products[i].quantity = 1;
      }
      console.log(prods);
      console.log('aaaaaaaaaa');
    });

    //  this.cartService.MyShoppingList.subscribe((cart) => {
    //   this.cart = cart;
    //   console.log(cart);
    // });

    this.cartService.MyShoppingList1.subscribe((productCart) => {
      this.cart1 = productCart;
      console.log(productCart);
    });


    console.log('Sone..');
  }
  sortShow(){
    if(this.sortListClass===''){
      this.sortListClass='hide';
    }else{
      this.sortListClass='';
    }
  }

  AddToCard(p2buy: Product) {
    console.log(`${p2buy} added to cart`);
    this.cartService.addProductToCart(p2buy);

  }

  addPrd(p2buy: Product) {
    p2buy.quantity++;
  }
  deletePrd(p2buy: Product) {
    if (p2buy.quantity === 1) {
      return;
    }
    p2buy.quantity--;
  }
  sendToCart(p2buy: Product) {
    this.cartService.addProductToCart(p2buy);
    // this.cart1.push(p2buy);
    // this.cartService.MyShoppingList1.next(this.cart1);
  }
  row(){
    this.option='row1'
  }
  column(){
    this.option='column1'
  }




  removePrd(p2buy: Product) {
    let product = this.cart1.find((cart, i) => {
      if (cart._id === p2buy._id) {
        this.cart1[i].quantity--;
        return true;
      }
      return;
    });
  }

  addCart1(p2buy: Product) {
    this.cartService.addProductToCart(p2buy);
    this.cartService.MyShoppingList1.next(this.cart1);
    let product = this.cart1.find((cart, i) => {
      if (cart._id === p2buy._id) {
        this.cart1[i].quantity++;
        return true;
      }
      return;
    });
    console.log(product);
    if (!product) {
      p2buy.quantity = 1;
      this.cart1.push(p2buy);
    }

  }
  sort(sortBy: string,reverse:boolean) {
    this.sortingBy = sortBy;
    if(reverse){
      this.reverseClass='reverse';
    }else{
      this.reverseClass='';
    }
    this.sortShow();
  }
}
