import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { Cart } from './models/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('cart') cartElement:ElementRef;


  ngOnInit(){

  }

  // fullScreen(){
  //   if(this.cartElement.nativeElement.offsetHeight<300){
  //     return 'full-width';
  //   }
  //   return;
  // }
}
//
