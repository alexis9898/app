const Customer = require("../product/customer");
const Product = require("../product/product");
const OrderDetail = require("../product/order-detail");

async function addNewOrderAsync(order) {
    return order.save();
}

module.exports={
    addNewOrderAsync
}