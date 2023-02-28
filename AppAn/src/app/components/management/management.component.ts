import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  option1=true;
  option2=false;
  categories:any=[];

  constructor(public categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe();

    this.categoryService.category.subscribe((categories)=>{
      this.categories=categories;
    });
  }

  add(){
    this.router.navigateByUrl('/management-add-product');
  }
  change(){
    this.router.navigateByUrl('/management-change-product');
  }

}
