const { date, number } = require("joi");
const mongoose = require("mongoose");
const { async } = require("rxjs");

//

//for one product => one order
const OrderDetailShema = mongoose.Schema(
  {
    orderId:{ //kabala
      type:mongoose.Schema.Types.ObjectId,
      required:[true, "is missing"]
    },
    productId:{ 
      type: mongoose.Schema.Types.ObjectId,
      required:[true,"product is missing"]
    },
    quantity:{
      type: Number,
      default:1
    },
    price:{ //price that customer bought
      type:Number,
    }
  },
  {
    versionKey: false, //kaAsher anu yozrim object prodact hadash mitvasef la-object mishtane -> __v, pkuda zo mevatelet ota
    toJSON: { virtuals: true }, //kaAsher AmaArehet(system) mamira le-JSON, anu meAshrim to be sade virtual
    id: false, // brirat mehdal shel system- potahat mishtene id , pkuda zo mevatelet ota ki yesh lanu _id le Category
  }
);

const OrderDetail = mongoose.model("OrderDetail", OrderDetailShema, "order_details");

module.exports = OrderDetail;
