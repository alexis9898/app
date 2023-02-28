//Aazana le-bakasha shel alakoAh
//kmo server

const { request, response } = require("express");
const express = require("express");
const { async } = require("rxjs");
const CustomerLogic = require("../business-logic/customer-logic");
const Customer = require("../product/customer");
const bcrypt = require('bcrypt');
const  mongoose  = require("mongoose");
const CartLogic = require("../business-logic/cart-logic");
const Cart = require("../product/cart");


const router = express.Router(); //kmo server

//get all customer
// router.get("/", async (request, response) => {
//   try {
//     const customers = await CustomerLogic.getAllCustomerAsync();
//     response.json(customers); //mahzir array of object
//   } catch (err) {
//     response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
//   }
// });

//post(add) full customer
router.post("/", async (request, response) => {
  try {
    const customer = new Customer(request.body);
    
    await customer.validate();
    
    const addCustomer = await CustomerLogic.addCustomerAsync(customer);
    console.log("++++++++++++++++++00");
    
    response.status(201).json(addCustomer);
  
  } catch (err) {
    if(err._message=="Customer validation failed"){
        response.status(400).send(err.message);
        return;
    }
    response.status(500).send(err.message);
  // return;
  }
});


//updatte Full customer
router.put("/:_id", async (request, response) => {
  try {
    const customer = new Customer(
      request.body
    );
    customer._id=request.params._id;

     await customer.validate();
      

    const customerUpdate = await CustomerLogic.upddateCustomerAsync(customer);
    if (!customerUpdate) {
      //customer not found(id not exist)
      response.sendStatus(404);
      return;
    }
    response.json(customerUpdate);
  } catch (err) {
    if(err._message=="customer validation failed"){
      response.status(400).send(err.message);
      return;
  }
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//updatte partial customer
router.patch("/:_id", async (request, response) => {
  try {
    // const _id=request.params._id;
    // const originalCustomer= await CustomerLogic.getOneCustomerAsync(_id);
    // if (!originalCustomer) {
    //   response.sendStatus(404);
    //   return; 
    // }

    const customer = new Customer(
      request.body
    );
    // console.log(request.body);
    // console.log(customer);
    customer._id=request.params._id;
    const customerUpdate = await CustomerLogic.upddateCustomerAsync(
      customer
    );

    if (!customerUpdate) {
      //customer not found(id not exist)
      response.sendStatus(404);
      return;
    }
    response.json(customerUpdate);
  } catch (err) {
    response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//delete customer
router.delete("/:_id", async (request, response) => {
  //od shita lefakeAh al id al-yedey rgx(betoh a-(), ahrey id nevazeA bdika)
  try {
    const _id = request.params._id;
    await CustomerLogic.deleteproductAsync(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

router.get("/cart-of-customer/:_id", async (request, response) => {
  try {
    const _id =  request.params._id;

    const customerCart = await CustomerLogic.getCustomertWithHisProductsCartAsync(_id);
    console.log(customerCart);
    
    response.json(customerCart); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});




//add product cart
router.post("/add-product-to-cart/:_id", async (request, response) => { //_id of customer
  try {
    
    const addProductToCart = request.body; //customerId , productId, sum
    const customerCart = new Cart();
    const _id= request.params._id;
       
    // customer.cartProductId.push(addProductCart);

    const addProduct = await CartLogic.addProductToCartAsync(_id,addProductToCart);
    console.log("++++++++++++++++++00");
    
    response.status(201).json(addProduct);
  
  } catch (err) {
    if(err._message=="Customer validation failed"){
        response.status(400).send(err.message);
        return;
    }
    response.status(500).send(err.message);
  // return;
  }
});


// get products cart of customer (_id:customerId)
router.get("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;

    const FindcustomerCart = await CartLogic.getCustomertWithHisProductsCartAsync(_id);
    if (!FindcustomerCart) {
      response.sendStatus(404);
      return; 
    }
    response.json(FindcustomerCart);
  } catch (err) {
    response.status(500).send(err); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

module.exports = router;
