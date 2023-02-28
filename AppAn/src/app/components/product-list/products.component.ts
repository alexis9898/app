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
  public cart: Array<Cart<Product>> = [];
  public cart1: Array<Product> = [];
  option = 'row1';
  searchProduct!: string;
  sortingBy!: string;

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

    // setTimeout(() => {
    //   this.productsService.editProduct1();
    // }, 3000);
    // setTimeout(() => {
    //   this.productsService.productsChange.next([<Product>{ProductName: 'banna',
    //     ProductId: 2,
    //     UnitPrice: 5,
    //     }]);
    // }, 4000);
    // setTimeout(() => {
    //   this.productsService.productsChange.next(this.products);
    // }, 5000);

    //my produts(not from servise)
    // let product1: Product = <Product>{
    //   ProductName: 'apple',
    //   ProductId: 1,
    //   UnitPrice: 3,
    //   UnitsInStock: 5,
    // };
    // let product2: Product = {
    //   ProductName: 'banna',
    //   ProductId: 2,
    //   UnitPrice: 5,
    //   UnitsInStock: 5,
    // };

    // let product3: Product = {
    //   ProductName: 'kiwi',
    //   ProductId: 1,
    //   UnitPrice: 9,
    //   UnitsInStock: 5,
    // };

    // this.products = new Array<Product>(
    //   product1,
    //   product2,
    //   product3,

    //   <Product>{
    //     ProductName: 'kiwi',
    //     ProductId: 1,
    //     UnitPrice: 9,
    //     UnitsInStock: 5,
    //   }
    // );

    console.log('Sone..');
  }

  AddToCard(p2buy: Product) {
    console.log(`${p2buy} added to chard`);
    this.cartService.addProductToCart(p2buy).subscribe();
    // let cartCustomer=this.cart.find((cart,i)=>{
    //   if(cart.product===p2buy){
    //     this.cart[i].amount++;
    //     return true;
    //   }
    //   return;
    // });
    // if(!cartCustomer){
    //   let cart= {
    //     product:{
    //       ...p2buy
    //     },
    //     amount:1
    //   }
    //   this.cart.push(cart);
    // }
    // this.cartService.MyShoppingList.next(this.cart);
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
    let product = this.cart1.find((cart, i) => {
      if (cart._id === p2buy._id) {
        this.cart1[i].quantity = p2buy.quantity;
        return true;
      }
      return;
    });
    console.log(product);
    if (!product) {
      this.cart1.push(p2buy);
    }
    this.cartService.MyShoppingList1.next(this.cart1);
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

    this.cartService.MyShoppingList1.next(this.cart1);
  }
  sort(sortBy: string) {
    this.sortingBy = sortBy;
  }
}
