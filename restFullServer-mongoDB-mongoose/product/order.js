const mongoose = require("mongoose");
const { ref } = require("joi/lib");


//oeder === kabala

const OrderShema = mongoose.Schema(
  {
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "is missing"]
    },
    dateOrder:{
      type: Date,
      default: Date.now 
    },
  },
  {
    versionKey: false, //kaAsher anu yozrim object prodact hadash mitvasef la-object mishtane -> __v, pkuda zo mevatelet ota
    toJSON:{virtuals:true},
    id: false
  }
);

OrderShema.virtual("ordersProducts",{
    ref:"Product",
    localField:"productId",
    foreignField: "_id",   
    justOne: true
});

const Order = mongoose.model("Order", OrderShema, "orders"); //yozrim et amodel(et amuzar), (1-ma anu rozim lizor, 2-validaziA(bdikot), 3-le-Eyze collection(detabase) leOsif)

module.exports = Order;