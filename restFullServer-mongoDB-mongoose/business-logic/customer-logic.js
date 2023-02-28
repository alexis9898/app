//kol peUla hishuvit mitbazeA ba-module aze kaAsher mekablim et anetunim mi-database

const { object } = require("joi/lib");
const Customer = require("../product/customer");
const Product = require("../product/product");
const Cart = require("../product/cart");
const Order = require("../product/order-detail");

// var ObjectID = require("mongodb").ObjectID;

function getAllCustomerAsync() {
  return Customer.find().exec(); //exec()-> function return promis
}

//findeOne() benigud la-find() mehapeset object/mishtane ehad she-mekayem et Atnay (object ehad lefi atnay she anu mahnisim la-())
// find() anu mehapsim object she mekayem et atnay: ({_id:_id}) - mehapes object ehad she A-_id shelo shave la-_id sheba huz-(_id)
// *be javascript nitan lorshom bimkom find(({_id:_id})) -> find(({_id}))
// _id shemibahuz(shemitkabel from out - getOneCustomerAsync(_id)) hu string, ve _id mongodb hu object lahen hayinu zrihim lirshom find({find:mongodb.ObjectId._id}), aval mongoose otomati memir et astring laobject, lahen anu roshmim yashar betor string -> find(_id)
function getOneCustomerAsync(_id) {
  return Customer.findOne({ _id }).exec();
}

async function addCustomerAsync(customer, cart) {
  cart.save();
  return customer.save();
}

async function upddateCustomerAsync(customer) {
  const originalCustomer = await Customer.findOne({ _id: customer._id }).exec();

  if (!!customer.cartProductId) {
    console.log("aaaaaaaaaa");
    customer.cartProductId = originalCustomer.cartProductId;
  }

  if (!!customer.orderProductsId) {
    customer.orderProductsId = originalCustomer.orderProductsId;
  }

  const info = await Customer.updateOne({ _id: customer._id }, customer).exec(); //updateOne() A-exec() lo mahzira object customer ela object shel meyda(info) lahen afunction hi async
  return info.matchedCount > 0 ? customer : null; //info.matchedCount: im customer nimza
}

function deleteCustomerAsync(_id) {
  return Customer.deleteOne({ _id }).exec();
}

//shayilta:(pkudot shel amesed netunim)
// sql: select... from... where price>=minPrice and price<=maxPrice.
// (mongodb) comparsion query operation:
//$gt Greater than
//$gte Greater than or equal
//$lt: lower than
//$lte: lower  than or equal
//$eq:equal
//$ne: not equal
//$in: in
//$in: not in
//$or: or

async function getCustomertWithHisProductsCartAsync(_id) {
  let Cartprodacts = [];
  let cart = await Customer.find({ _id: _id }).exec();
  for (let i = 0; i < cart[0].cartProductId.length; i++) {
    const products = await Product.findOne({
      _id: cart[0].cartProductId[i].productId,
    }).exec();
    Cartprodacts.push({
      products: products,
      sum: cart[0].cartProductId[i].sum,
    });
  }
  // for (let i = 0; i < Object.keys(cart[0].cartProductId).length; i++) {
  //   Cartprodacts += await Product.findOne({_id:cart[0].cartProductId[i].productId}).exec();
  // }
  console.log(Cartprodacts);
  return Cartprodacts;
}

//orders of customer:
async function getAllOrdersOfCusromer(_id) {
  //_id: customerId
  return Order.find({ customerId: _id }).exec();
}

//all products orders of customer:
async function getAllOrdersOfCusromer(_id) {
  //_id: customerId
  const orders = await Order.find({ customerId: _id }).exec();
  if (!orders) {
    return null;
  }

  let products = [];
  for (let i = 0; i < orders.length; i++) {
    const product = await Product.find({ _id: orders[i].productsId });
    if (!product) {
      products.push(product);
    }
  }

  return products;
}

module.exports = {
  getAllCustomerAsync,
  getOneCustomerAsync,
  addCustomerAsync,
  upddateCustomerAsync,
  deleteCustomerAsync,
  getCustomertWithHisProductsCartAsync,
};
