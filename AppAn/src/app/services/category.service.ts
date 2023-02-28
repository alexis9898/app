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
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private http: HttpClient) { }
category = new BehaviorSubject<Category[]>([]);

getAllCategories() {
  return this.http.get<Category[]>('http://localhost:3000/api/products/category-with-his-product').pipe(
    take(1),
    tap((Category) => {
      this.category.next(Category);
    })
  );
}

getListAllCategory(){
  return this.http.post<Category[]>('http://localhost:3000/api/category/get-list-category',{});
}

getListOneCategory(CategoryId:string){
  return this.http.post<Category[]>('http://localhost:3000/api/category/get-list-category',{categoryId:CategoryId});
}
}



