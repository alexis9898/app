
async function showproduct(){
    const response=await fetch("http://localhost:3000/api/get-cart-cookie"); //glishat ajax-> glisha mizad lakoAh lzadd sharat
    const products= await response.json(); //pkuda shemehalezet et products ve-ofehet otam le-json(me-string)
    console.log(products);
    let ul="<ul>";
    for(const p of products){
        ul+="<li>"+p.name+" &rarr; $"+p.price +"</li>";
    }
    ul+="</ul>";
    document.getElementById("show").innerHTML=ul;
}

async function saveSession(){

    // let a=[{a0:"ass",a1:12 ,o:{o0:"aAss"}}];
    // console.log(a.o.o0);

    let ajax=new XMLHttpRequest();
    ajax.open("post","http://localhost:3000/api/add-product-to-cart-cookie",true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.onload = function () {
        if(this.responseText=="you cant adde, max 2 the same product" || !this.responseText){
            return;
        }
        const productsCart=JSON.parse(this.responseText);
        console.log(productsCart);
        let ul="<ul>";
        for(const p of productsCart){
            ul+="<li>"+p.name+" &rarr; $"+p.price +"</li>";
        }
        ul+="</ul>";
        document.getElementById("show").innerHTML=ul;
};
    ajax.send(JSON.stringify( {_id:"6378e77ae252ccddf91017be"}));
    }

   
