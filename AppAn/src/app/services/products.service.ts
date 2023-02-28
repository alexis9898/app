import { Injectable } from '@angular/core';
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
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  productsChange = new BehaviorSubject<Product[]>([]);

  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:3000/api/products').pipe(
      take(1),
      tap((products) => {
        this.productsChange.next(products);
      })
      // ,delay(3000),
      // tap(() => {
      //   this.productsChange.next([]);
      // })
    );
  }
  getAllProductsWithImages() {
    return this.http.get<Product[]>('http://localhost:3000/api/products/all-products-with-images').pipe(
      take(1),
      tap((products) => {
        this.productsChange.next(products);
      })
    );
  }
  getAllProductsWithImages2() {
    return this.http.get<Product[]>('http://localhost:3000/api/products/all-products-with-images');
  }

  postNewProduct(product:Product){
    return this.http.post<Product>('http://localhost:3000/api/products',product);
  }
  getProductsOfOneCategoryWithImages(categoryId:string){
    return this.http.post<Product[]>('http://localhost:3000/api/category/get-products-of-category-with-images',{categoryId:categoryId});
  }
  updateProducrt(prd:Product){
    return this.http.patch<Product>('http://localhost:3000/api/products/'+prd._id, prd);
  }
  editProduct1() {
    console.log('------------');
    const prods = [...this.productsChange.value];
    const ddd = {
      ...prods[1],
      ProductName: '111',
    } as Product;
    prods[1] = { ...prods[1], name: 'sdsdsd' };
    this.productsChange.next(prods);
  }
}
