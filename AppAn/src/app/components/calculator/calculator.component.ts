import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public numbers:any[]=[];
  public calculate:Number | undefined;
  public symbols:any=[
    {html:'C',f:this.clear},
    {html:'D',f:this.show},
    {html:'%',f:""},
    {html:'/',f:""},
    {html:'X',f:""},
    {html:'-',f:""},
    {html:'+',f:""},
    {html:'=',f:""},
  ];

  result:string="0"; //for show
  calc:string='0'; //for calculate
  value=0;
  equal="=";
  rest="AC";
  delete="D";
  zero="0";
  multiplication="x";
  division="÷";
  operatinSymbol=`${this.multiplication}${this.division}+-.`;
  point=".";
  Ans='ANS';
  ans='';
  activeValue=false;
  btns:string[][]=[
    [this.rest,this.delete,"%","÷"],
    ["7","8","9",this.multiplication],
    ["4","5","6","-"],
    ["1","2","3","+"],
    [this.Ans,this.zero,this.point,this.equal],
  ];
  Numbers:string="0123456789";
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i <=10; i++) {
      this.numbers[i]=i-1;
      if(i===0){
        this.numbers[i]='.';
      }
      if(i<8){
        this.symbols[i].mikum=i;
      }
    }
  }

  class(button:string){
    if(this.Numbers.includes(button)){
      return;
    }
    switch (button) {
      case ".":
        return "";
      case this.equal:
        return "equal";
      default:
        return "not-numbers-btn";
    }
  }

  click(button:string){
    if(this.activeValue){
      this.activeValue=false;
      this.result='0';
    }
    switch (button) {
      case this.rest:
        this.clear();
        break;
      case this.delete:
        this.Delete();
        break;
      case this.equal:
        this.Equal(button);
        this.activeValue=true;
        // document.getElementById("value")?.classList.add("ans");
        return;
      case this.Ans:
        this.getAns();
        break;

      default:
        this.push(button);
        break;
    }
    console.log("calaulate");
    // this.activeValue=false;
    this.Equal(button);
  }

  valueClaas(){
    if(this.activeValue){
      return "activeValue";
    }
    return "value";
  }




  f(func:any){
    func();
  }
  KefekHiluk(key:string){
    // if(s)
  }
  getAns(){
    if(this.ans===''){
      return;
    }
    if(this.result==='0'){
      this.result=this.ans;
      return;
    }
    this.result+=this.ans;
  }
  Equal(btn:string){
    this.calc=this.result;
    if(this.operatinSymbol.includes(this.result[this.result.length-1]) ){
      // this.result=this.result.slice(this.result.length-1,1);
      this.calc=this.calc.slice(0,this.result.length-1);
    }
      this.calc= this.replaceAll(this.calc,this.multiplication,'*');
      this.calc= this.replaceAll(this.calc,this.division,'/');
      this.value=eval(this.calc);
      if(btn===this.equal){
      this.ans=this.value+'';
      console.log(this.ans);
    }
  }
  clear(){
    this.result="0";
  }
  Delete(){
    if(this.result.length==1){
      this.result="0";
      return;
    }
    this.result= this.result.substring(0,this.result.length-1);
  }
  push(btn:string){
    if(this.result==="0"){
      this.result=btn;
      return;
    }
    if(this.operatinSymbol.includes(btn)){
      const lastKeyLoction=this.result.length-1;
      const lastKey=this.result[lastKeyLoction];
      if(this.operatinSymbol.includes(lastKey)){
        this.result=this.result.slice(0,lastKeyLoction);
        this.calc=this.calc.slice(0,lastKeyLoction);
        // this.result+=btn;
        // return;
      }
      // if(btn===this.multiplication){
      //   this.calc+="*";
      // }
      // if(btn===this.division){
      //   this.calc+="/";
      // }

    }
    if(btn!==this.multiplication || btn!==this.division){
      this.calc+=btn;
    }
    this.result+=btn;
  }


  replaceAll(str:string, find:string, replace:string) {
    return str.replace(new RegExp(find, 'g'), replace);
  }


  show(){
    console.log(this.calc);
  }
}
