import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { KeyValue } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AddPrdService } from '../../services/add-prd.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductsService } from 'src/app/services/products.service';



@Component({
  selector: 'app-management-add',
  templateUrl: './management-add.component.html',
  styleUrls: ['./management-add.component.css']
})
export class ManagementAddComponent implements OnInit {

  @ViewChild('f') addPrd:NgForm | undefined ;
  categories:any=[];

  prd: Product | any={
    ...Product,
    name: '',
    price: 0,
    categoryId: '',
    stock: 0,
  };

  foto:any='';

  // example!: Product;
  imagesForShow:any=[];
  images:any=[];


    constructor(
      public categoryService:CategoryService,
      public imageService:ImageService,
      public productsService:ProductsService,
      ) { }

    // private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    //   return -1;
    // }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe();

    this.categoryService.category.subscribe((categories)=>{
      this.categories=categories;
    });
  }

  add(p:any){
    this.prd.categoryId=p._id;
    // this.prd;
    console.log(p);
    console.log(this.prd);
  }

  removeImage(src:string){
    const index=this.imagesForShow.indexOf(src);
    this.imagesForShow.splice(index,1);
    this.images.splice(index,1);
    console.log(this.imagesForShow);
    console.log(this.images);
  }

  submit(f:NgForm){

    this.prd={...this.prd,
      name:f.value.name,
      price:f.value.price,
      stock:f.value.stock,
    }
    console.log(this.prd);
    // console.log(f);

    this.productsService.postNewProduct(this.prd).subscribe((resP:Product)=>{
      console.log(resP._id);
      for (let i = 0; i < this.images.length; i++) {
        console.log(this.images[i]);
        let formData = new FormData();
        formData.append("mySingleImage",this.images[i]);
        this.imageService.UpdateImage(formData).subscribe(path=>{
          const image={path:path, productId:resP._id};
          this.imageService.PostImage(image).subscribe();
        });
        // this.imageService.
      }
    },error=>{
      console.log(error);
    }
    );




  }

  AddPhotos(event:any){
    // console.log(event.target.files[0].name);
    // this.foto=URL.createObjectURL(event.target.files[0]);
    // URL.revokeObjectURL(this.foto);
    // let f=document.getElementById("r");
    // f.src=this.foto;
    // this.foto=event.target.files[0].name;

    let reader= new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.images.push(event.target.files[0]);
    reader.onload=()=>{
      console.log(this.imagesForShow.length);
      this.foto=reader.result;
      // console.log(this.foto);
      this.imagesForShow.push(this.foto);
      console.log(this.images);
    };
    // console.log(this.foto);
  }

}


