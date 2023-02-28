import { Image } from './image';
export class Product{
  constructor(
    public _id: string,
    public name:string,
    public price:number,
    public categoryId:string,
    public stock:number,
    public images:Array<Image>,
    public quantity:number  //number of product in cart
  ){}
}

