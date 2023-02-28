const mongoose = require("mongoose");

const OrderShema = mongoose.Schema(
  {
    customerId:{
        type:mongoose.Schema.ObjectId
    },
    // email:{},
    cartProductId:[{
        productId:{
           type:mongoose.Schema.Types.ObjectId,
        },
        sum:{
           type:Number,
           default:1
        }
    }],
  },
  {
    versionKey: false, //kaAsher anu yozrim object prodact hadash mitvasef la-object mishtane -> __v, pkuda zo mevatelet ota
    toJSON:{virtuals:true},
    id: false
  }
);

const Cart = mongoose.model("Cart", OrderShema, "carts");

module.exports = Cart;