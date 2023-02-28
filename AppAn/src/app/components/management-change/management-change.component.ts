import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { KeyValue } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AddPrdService } from '../../services/add-prd.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsComponent } from '../product-list/products.component';
import { Category } from 'src/app/models/category';
import { Image } from '../../models/image';
import { NgModel } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
// import{}

@Component({
  selector: 'app-management-change',
  templateUrl: './management-change.component.html',
  styleUrls: ['./management-change.component.css'],
  animations:[
    trigger('image1',[
      transition(':enter', [
        style({transform:'scale(0)',opacity:0.7}),
        animate('0.5s', style({transform:'scale(1)',opacity:1}))
      ]),
      transition(':leave', [
        style({transform:'scale(1)',opacity:1}),
        animate('0.5s', style({transform:'scale(0)',opacity:0.7}))
      ]),
    ]),
  ],
})
export class ManagementChangeComponent implements OnInit {

  @ViewChild('f') addPrd:NgForm | undefined ;
  showPrds=true;
  categories:any=[];
  defualtProducts='all-products';

  prd: Product={
    name: '',
    price: 0,
    categoryId: '',
    stock: 0,
    _id: '',
    images: [],
    quantity: 0
  };

  prdProperty:Array<any>=[
    "categoryId",
    "images",
    "_id"
  ]

  productsOfCategory: Array<Product> = [];

  foto:any='';

  // example!: Product;
  imagesForShow:any=[];
  imagesServer:any=[];
  removeImagesServerArray:Array<Image>=[];

  searchProduct!: string;


    constructor(
      public categoryService:CategoryService,
      public imageService:ImageService,
      public productsService:ProductsService,
      // public pruduct:Product,
      ) { }

    // private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    //   return -1;
    // }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe();

    this.categoryService.category.subscribe((categories)=>{
      this.categories=categories;
    });

    this.productsService.getAllProductsWithImages().subscribe();
    this.productsService.productsChange.subscribe((prds)=>{
      console.log("prds changed");
      console.log(prds);
      this.productsOfCategory=prds;
    });
  }

  add(c:any){
    this.prd.categoryId=c._id;
    // this.prd;
    console.log(c);
    console.log(this.prd);
  }

  removeImage(src:string){
    const index=this.imagesForShow.indexOf(src);
    this.imagesForShow.splice(index,1);
    this.imagesServer.splice(index,1);
    console.log(this.imagesForShow);
    console.log(this.imagesServer);
  }
  removImageFromServer(img:Image){
    const index=this.prd.images.indexOf(img);
    this.prd.images.splice(index,1);
    this.removeImagesServerArray.push(img);
    // document.getElementById(img.path)?.remove();
    console.log(this.removeImagesServerArray);
  }
  changeCategory(category:NgModel){
    const categoryId=category.value;
    if(categoryId===this.defualtProducts){
      this.productsService.getAllProductsWithImages2().subscribe(prds=>{
        this.productsOfCategory=prds;
      });
      return;
    }
    this.productsService.getProductsOfOneCategoryWithImages(categoryId).subscribe(prds=>{
      this.productsOfCategory=prds;
    });
    console.log(category.value);
    console.log(this.defualtProducts);
  }
  // changeCategory(c:any){
  //   console.log(c);
  //   this.productsService.getProductsOfOneCategoryWithImages(c).subscribe(products=>{
  //     this.productsOfCategory=products;
  //     console.log(this.productsOfCategory);

  //   });

  //   // this.prd.categoryId=c._id;
  // }

  ChoosePrdToChange(p:Product){
    this.prd=p;
    console.log(p);
    this.showPrds=false;
  }

  submit(f:NgForm){


    this.prd={...this.prd,
      name:f.value.name,
      price:f.value.price,
      stock:f.value.stock,
    }
    console.log(this.prd);
    // console.log(f);

    this.productsService.updateProducrt(this.prd).subscribe((resP:Product)=>{
      console.log(resP);

      for (let i = 0; i < this.removeImagesServerArray.length; i++) {
        const img=this.removeImagesServerArray[i];
        this.imageService.removeImgFile(img).subscribe();
        this.imageService.removeImg(img).subscribe();
      }

      for (let i = 0; i < this.imagesServer.length; i++) {
        console.log(this.imagesServer[i]);
        let formData = new FormData();
        formData.append("mySingleImage",this.imagesServer[i]);
        this.imageService.UpdateImage(formData).subscribe(path=>{
          const image={path:path, productId:resP._id};
          this.imageService.PostImage(image).subscribe((response:any)=>{
            if(i===this.imagesServer.length-1){
            }
          });
        });
        // this.imageService.
      }
      setTimeout(() => {
        this.productsService.getAllProductsWithImages().subscribe();
        console.log('im here');
        this.imagesForShow=[];
        this.imagesServer=[];
        this.removeImagesServerArray=[];
        this.showPrds=true;
      }, 10);



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
    console.log(event);

    let reader= new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.imagesServer.push(event.target.files[0]);
    reader.onload=()=>{
      console.log(this.imagesForShow.length);
      this.foto=reader.result;
      // console.log(this.foto);
      this.imagesForShow.push(this.foto);
      console.log(this.imagesServer);
    };
    // console.log(this.foto);
  }
}
