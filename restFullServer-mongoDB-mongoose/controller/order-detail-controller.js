const { request, response } = require("express");
const express = require("express");
const { async } = require("rxjs");
const CustomerLogic = require("../business-logic/customer-logic");
const ProductLogic = require("../business-logic/product-logic");
const OrderDetailLogic = require("../business-logic/order-detail-logic");
const Customer = require("../product/customer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const CartLogic = require("../business-logic/cart-logic");
// const Order = require("../product/order-detail");

const router = express.Router(); //kmo server

// get all orders
// router.get("/", async (request, response) => {
//   try {
//     const orders = await OrderLogic.getAllOrdersWithDetailsAsync();
//     response.json(orders); //mahzir array of object
//   } catch (err) {
//     response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
//   }
// });

router.get("/", async (request, response) => {
  try {
    const orders = await OrderDetailLogic.getAllOrders();
    response.json(orders); //mahzir array of object
  } catch (err) {
    response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//add order
router.post("/", async (request, response) => {
  //_id of customer
  try {
    const orderDetail = new Order(request.body); //request.body= {customerId, productsId:[productId]}

    await orderDetail.validate();

    const product = await ProductLogic.getOneProductAsync(orderDetail.productsId);
    if (!product) {
      response.status(404).send("no product is picked");
      return;
    }

    const addOrders = await OrderDetailLogic.addNewOrderAsync(orderDetail);
    console.log("++++++++++++++++++00");
    response.status(201).json(addOrders);
  } catch (err) {
    if (err._message == "Order validation failed") {
      response.status(400).send(err.message);
      return;
    }
    response.status(500).send(err.message);
    // return;
  }
});

module.exports = router;
