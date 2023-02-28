import { Pipe ,PipeTransform } from "@angular/core";
import { Product } from "../models/product";

@Pipe({
  name:'filterProducts',
  pure:false
})

export class FilterProductsPipe implements PipeTransform{
  transform(products:Product[], searchProduct:string):Product[] {
    let Filter=new Array<Product>();
    if(products && products.length>0 && searchProduct && searchProduct.length>0){
      products.forEach(prd=>{
        if(prd.name.toLowerCase().includes(searchProduct.toLowerCase())){
          Filter.push(prd);
        }
      });
      return Filter;
    }else{
      return products;
    }
  }
}


