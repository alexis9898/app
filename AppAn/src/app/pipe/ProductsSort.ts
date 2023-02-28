import { Pipe ,PipeTransform } from "@angular/core";
import { Product } from "../models/product";

@Pipe({
  name:'productsSort',
  pure:false
})

export class SortProductsPipe implements PipeTransform{
  transform(products:Product[], sortBy: string):Product[] {
    if(products && products.length>0 && sortBy && sortBy.length>0){
      // products[0].s
     products.sort(((a: Product | any, b: Product | any) => {
      if(a[sortBy]>b[sortBy]){
        return 1;
      }else{
        return -1;
      }
    }));
  }
  return products;
  }
}


