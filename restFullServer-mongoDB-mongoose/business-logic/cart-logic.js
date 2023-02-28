//kol peUla hishuvit mitbazeA ba-module aze kaAsher mekablim et anetunim mi-database

// const { object } = require("joi/lib");
const Customer = require("../product/customer");
const Product = require("../product/product");
const Cart = require("../product/cart");

// var ObjectID = require("mongodb").ObjectID;

async function getOneCartCustomerWithAllProductsAsync(customerId) {
  let Cartprodacts=[];
  let cart =await Cart.findOne({customerId:customerId}).exec(); 
  for (let i = 0; i < cart[0].cartProductId.length; i++) {
    const products= await Product.findOne({_id:cart[0].cartProductId[i].productId}).exec();
    Cartprodacts.push({
      products:products,
      sum: cart[0].cartProductId[i].sum
    })
  }
  console.log( Cartprodacts);
  return Cartprodacts;
}





async function addProductToCartAsync(_id,addProduct) { //(_id:customerId), (addProduct:{ productId:req, sum }) 
  const originalCustomerCart=await Cart.findOne({customerId:_id}).exec();

  for (let i = 0; i < array.length; i++) {

  }

}
  





// function getOneCustomerAsync(_id) {
//   return Customer.findOne({ _id }).exec();
// }

// function addCustomerAsync(customer) {
//   return customer.save();
// }

// async function upddateCustomerAsync(customer) {
//   const originalCustomer= await Customer.findOne({ _id: customer._id }).exec();

//   if(!!customer.cartProductId){
//     console.log("aaaaaaaaaa");
//     customer.cartProductId=originalCustomer.cartProductId;
//   }

//   if(!!customer.orderProductsId){
//     customer.orderProductsId=originalCustomer.orderProductsId;
//   }  

//   const info = await Customer.updateOne({ _id: customer._id }, customer).exec(); //updateOne() A-exec() lo mahzira object customer ela object shel meyda(info) lahen afunction hi async
//   return info.matchedCount > 0 ? customer : null; //info.matchedCount: im customer nimza
// }


// function deleteCustomerAsync(_id) {
//   return Customer.deleteOne({_id}).exec();
// }

// //shayilta:(pkudot shel amesed netunim)
// // sql: select... from... where price>=minPrice and price<=maxPrice.
// // (mongodb) comparsion query operation:
// //$gt Greater than
// //$gte Greater than or equal
// //$lt: lower than
// //$lte: lower  than or equal
// //$eq:equal
// //$ne: not equal
// //$in: in
// //$in: not in
// //$or: or


// //cart of customer:


module.exports = {
  getOneCartCustomerWithAllProductsAsync,
  
};
