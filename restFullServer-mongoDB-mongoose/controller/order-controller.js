const CustomerLogic = require("../business-logic/customer-logic");
const ProductLogic = require("../business-logic/product-logic");
const OrderLogic = require("../business-logic/order-logic");
const OrderDetailLogic = require("../business-logic/order-detail-logic");
const Order = require("../product/order");
const OrderDetail = require("../product/order-detail");

const express = require("express");
const router = express.Router(); 

//add order
router.post("/", async (request, response) => {
    try {
        //new order:
        if(!request.body.customerId || !request.body.productsCart){
            response.status(400).send(`customerId || productsCart are missing`);
            return;
        }
        const order = new Order(request.body); //request.body= {customerId:(mongoose-_id) , productsCart:[{product}]}

        // console.log(order);
        await order.validate();

        const customer = await CustomerLogic.getOneCustomerAsync(order.customerId);
        if (!customer) {
          response.status(404).send("customer not found");
          return;
        }

        // new order_detail: 
        let productList=request.body.productsCart;
        if (productList.length==0) {
            response.status(400).send("no product picked");
            return;
          }

        console.log(order._id);  
        //check validattion: if one productList not OK
        for (let i = 0; i < productList.length; i++) {
            const product = await ProductLogic.getOneProductAsync(productList[i]._id);
            if (!product) {
                console.log(`productId:${productList[i]._id} not found`);
                response.status(404).send(`productId:${productList[i]._id} not found`);
                return;
            }
        }
        
        //save:
        await OrderLogic.addNewOrderAsync(order);

        for (let i = 0; i < productList.length; i++) {
            const orderDetail= new OrderDetail({
                orderId:order._id,  //_id of order(mispar kabala)
                productId:productList[i]._id,
                quantity:productList[i].quantity,
                price:productList[i].price //price that customer bought
            });
            await OrderDetailLogic.addNewOrderDetailAsync(orderDetail);
        }
        response.send(order._id);

    } catch (err) {
        if (err._message == "Order validation failed") {
            response.status(400).send(err.message);
            return;
          }
          response.status(500).send(err.message);
    }
});

module.exports = router;
