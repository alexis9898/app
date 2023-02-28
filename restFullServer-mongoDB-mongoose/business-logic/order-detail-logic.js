const Customer = require("../product/customer");
const Product = require("../product/product");
const OrderDetail = require("../product/order-detail");
const { async } = require("rxjs");

async function getAllOrdersWithDetailsAsync() {
  let ordersDetail = [];
  const orders = await OrderDetail.find().exec();

  for (let i = 0; i < orders.length; i++) {
    let productsId = [];
    for (let j = 0; j < orders[i].productsId.length; j++) {
      const product = await Product.findOne({
        _id: orders[i].productsId[j]._id,
      }).exec();
      if (!product) {
        productsId.push(product);
      }
    }
    ordersDetail.push({
      customerId: orders[i].customerId,
      dateOrder: orders[i].dateOrder,
      productsId: productsId,
    });
  }
  return ordersDetail;
}

async function addNewOrderDetailAsync(orderDtail) {
  return orderDtail.save();
}

async function getAllOrders(order) {
  return OrderDetail.find().exec();
}

module.exports = {
  getAllOrdersWithDetailsAsync,
  addNewOrderDetailAsync,
  getAllOrders,
};
