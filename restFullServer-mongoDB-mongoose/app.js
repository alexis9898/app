const express=require("express"); //module ahayav le-hatkin
const cors=require("cors"); //module ahayav le-hatkin
require("./deta-access-layer/dal");
const CustomerController=require("./controller/customer-controller");
const ProductController=require("./controller/product-controller");
const ProductLogic=require("./business-logic/product-logic");
const cookieParser = require("cookie-parser");
const proxy = require('express-http-proxy');
const CartController=require("./controller/cart-controller");
const OrderController=require("./controller/order-controller");
const ImageController=require("./controller/image-controller");
const StoreController=require("./controller//store-controller");
const CategoryController=require("./controller/category-controller");


const fileUpload = require("express-fileupload");
const uuid = require("uuid");
const expressSession= require("express-session"); //npm i express-session,  shomeret meyda(cookies) bazad Asharat
const server=express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const { request, response } = require("express");
const { async } = require("rxjs");
// global.config=require("C:\\Users\\Alex\\Desktop\\nodejs\\restFullServer\\config.json");

server.use(express.json()); //im yesh meyda be-toh Abody shel a-request -> ameyda nimtza be-request.body.prameter(mishtane) 

server.use(fileUpload());
server.use(cookieParser());
server.use(expressSession({ //kol lakoAH 1-> nishmar object 1 
    name:"shoppingCard", //name cookie
    secret:"mynameisalex", // secret name (to safty/security)
    resave:false, //lacookie yesh tokef, pkuda zo omeret she-kol paAm A-user golesh la-daf, A-zman mathil me-athala(from start)
    saveUninitialized:true,
    // cookie:{cart:[]}
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        secure: false,
        httpOnly: false,
    },
    // proxy:true
   
}));  
server.use(express.static(__dirname+"//client")); //pkuda zo omeret she-kaAsher naritz et app ve-nikanes ladafdefan-> adaf she-ipatah hu haktovet shel html she-rashamnu be-toh a->() 
server.use(cors()); // pkuda she-notenet arshaA le-atarim aherim liglosh la-sharat, kaAsher gam im A-port shone
// server.use(cors({origin:["http://localhost:5500","http://localhost:5505","http://localhost:4736","http://localhost:4200"]})); // pkuda she-notenet arshaA le-atarim spizifim liglosh la-sharat, kaAsher gam im A-port shone


server.use("/api/customer", CustomerController); 
server.use("/api/products", ProductController); 
server.use("/api/orders", OrderController); 
server.use("/api/image", ImageController); 
server.use("/api/store", StoreController); 
server.use("/api/category", CategoryController); 
// server.use("/api/cart", CartController); 






server.get("/api/products-cart",async (request,response)=>{
    try{
        if(!request.session.cart){
            request.session.cart=[];
        }; //({ product:{_id,name,..}, amount:number })
        response.json(request.session.cart);
        // response.json(request.session.cart)
    }catch(err){
        response.status(500).send(err);
    }
});


server.post("/api/add-product-to-cart",async (request,response)=>{
    try{
        console.log("im try add to cart");
        const _id=request.body._id;
        console.log(_id);
        
        const product= await ProductLogic.getOneProductAsync(_id);
        // const product= products.find(p=>p._id==_id);
        if (!product) {
            response.status(404).send("product not found");
            return;
        }

        console.log(`${request.session.cart}`);
        
        if(!request.session.cart){
            request.session.cart=[]; //({ product:{_id,name,..}, amount:number })
        }
        console.log(`cart: ${JSON.stringify(request.session.cart)}`);
        // console.log(`cart: ${JSON.stringify(request.session.cart)}`);
        
        let productCart= request.session.cart.find((productCart,i)=>{
            console.log(`herrrre`);
            
            if(productCart.product._id===_id){
                request.session.cart[i].amount++;
                // console.log(`product added ${JSON.stringify(request.session.cart[i])}`);
                // console.log(`product added ${JSON.stringify(request.session.cart)}`);
                
                return true;
            }
        });        
        if (!productCart) {
            productCart={
                product:product,
                amount:1
            }
            request.session.cart.push(productCart);
        }
        // console.log(`product added ${JSON.stringify(request.session.cart)}`);
        // console.log(`cart: ${myCart}`);
        console.log(`cart: ${JSON.stringify(request.session.cart)}`);
        
        // request.session.cart=JSON.stringify(myCart);
        request.session.save();
        response.json(request.session.cart);
    }
    catch(err){
        response.status(500).send(err);
    }
});

server.get("/delete-session",(request,response)=>{
    request.session.destroy();
    console.log("destroyed...");
    response.end();
});

server.post("/api/remove-product-from-cart", async(request,response)=>{
    try {
        
        if(!request.session.cart){
            response.status(400).send("cart is Empty");
            return;
        }
        
        const _id=request.body._id;
        
        // const products= await logic.getAllProductAsync();
        const productCart= request.session.cart.find((productCart,i)=>{
            if(productCart.product._id===_id){
                if(request.session.cart[i].amount===1){
                    request.session.cart.splice(i,1);
                    return true;
                }
                request.session.cart[i].amount--;
                return true;
            }
        });
        if(!productCart){
            response.status(400).send("product dost exist in cart");
            return;
        }
        
        console.log("product removed");
        response.send(request.session.cart);
    } catch (error) {
        response.send(error.message)    
    }
});



// let cart=[]; //({ product:{_id,name,..}, amount:number })


server.get("/api/get-cart-cookie",(request,response)=>{
    try{
        let cart=[]; //productcart0, productcart1..
        for (let i = 0; i < Object.keys(request.cookies).length; i++) {
            if(Object.keys(request.cookies)[i].slice(0,11)==="productCart" ){
             cart.push(Object.values(request.cookies)[i])   
            }
        }
        console.log(cart);
        response.json(cart);
        // response.json(request.session.cart)
    }catch(err){
        response.status(500).send(err);
    }
});
server.post("/api/add-product-to-cart-cookie", async(request,response)=>{
    try{
        const _id=request.body._id;
        console.log(_id);
        
        const product= await ProductLogic.getOneProductAsync(_id);
        // const product= products.find(p=>p._id==_id);
        if (!product) {
            response.status(404).send("product not found");
            return;
        }

        // if(!request.cookies.cart){
        //     response.cookie("cart",[],{maxAge: 1000 * 60 * 60 * 24 * 7 * 4* 12});//one year
        // };  //({ product:{_id,name,..}, amount:number })
        
        let cart=[]; //productcart0, productcart1..
        for (let i = 0; i < Object.keys(request.cookies).length; i++) {
            if(Object.keys(request.cookies)[i].slice(0,11)==="productCart" ){
             cart.push(Object.values(request.cookies)[i])   
            }
        }
        console.log(cart.length);
        
        // let productCart= cart.find((productCart)=>productCart.product._id===_id);        
        let sumProduct=0;
        for (let i = 0; i < cart.length; i++) {
            // console.log(cart[i]);
            if(cart[i]._id===_id){
                sumProduct++;
            }
        }
        if(sumProduct>=2){
            response.status(403).send("you cant adde, max 2 the same product");
            return;
        }
        
        response.cookie("productCart"+cart.length,product,{maxAge:6000*3});

        console.log("productCart"+cart.length);
        cart.push(product);
        
        console.log(request.cookies["productCart"+1]);
        console.log(cart);
        // request.cookies.get("")
        response.json(cart);


    }catch(err){
        response.status(500).send(err);
    }
});





server.use("*",(request,response)=>{ // *-im ha-user lo rasham et ehad arouts  
    response.status(404).send(`routing not exist`); //404-router not found url
});




// get all product
// server.get("/api/product",(request,response)=>{
//     response.json(products); //mahzir array of object
// });

// // get one product
// server.get("/api/product/:id",(request,response)=>{
//     const id= +request.params.id; //mahzir string (+ --> meshane et string le-int)
//     const product=products.find(p => p.id===id);
//     response.json(product);
// });

// server.use(proxy('http://localhost:4200'));


server.listen(3000,()=>{
    console.log(__dirname);
    console.log("listen: http://localhost:3000");
});

