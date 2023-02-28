import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: any = [];

  category1: Category[];
  category2: Category[];
  hoverCategory1 = false;
  hoverCategory2 = false;
  hoverCategoryIndex: number;
  CategoryList: Category[];

  constructor(
    public categoryService: CategoryService,
    public productsService: ProductsService,
    private router: Router
  ) {}

  @ViewChildren('itemElem') itemsList: QueryList<ElementRef<HTMLDivElement>>;

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe();
    this.categoryService.getListAllCategory().subscribe((catList) => {
      this.CategoryList = catList;
      console.log(this.CategoryList);
      setTimeout(() => {
        console.log(this.itemsList?.toArray?.()?.[1].nativeElement);
      }, 0);
    });

    this.categoryService.category.subscribe((category) => {
      this.categories = category;
    });
  }

  ngAfterViewInit() {}

  enterCategory1(category: Category, index: number) {
    this.hoverCategoryIndex = index;
    this.category1 = category.children;
    this.hoverCategory1 = true;
    this.hoverCategory2 = false;
    console.log(this.category1);

    // let active = document.getElementById(obj.id);
    // let hover = document.getElementById(obj.id);
    // active?.classList.add('');
    // hover?.classList.remove('');
  }
  outCategory1() {
    this.hoverCategory1 = false;
    this.hoverCategory2 = false;
  }

  enterCategory2(category: Category) {
    this.category2 = category.children;
    this.hoverCategory2 = true;
    console.log(this.category2);
    document.getElementById('tat-category')?.classList.add('full-screen');
  }

  GoShopping(category: Category) {
    this.productsService
      .getProductsOfOneCategoryWithImages(category._id)
      .subscribe((prd) => {
        this.productsService.productsChange.next(prd);
        console.log(prd);
        this.outCategory1();
        this.router.navigateByUrl('/products');
      });
  }

  hoverMainCategory() {}
}
