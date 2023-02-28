const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ref } = require("joi/lib");

const CustomerShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "is missing"],
    },
    password: {
      type: String,
      required: [true, "is missing"],
    },
    
    // cartId:{
    //   type:mongoose.Schema.Types.ObjectId
    // }
    // email:{},
    // cartProductId:[{
    //     productId:{
    //        type:mongoose.Schema.Types.ObjectId,
    //     },
    //     sum:{
    //        type:Number,
    //        default:1
    //     },
    // }],
    // orderProductsId:[{
    //     _id:false,
    //     productId:{
    //         type:mongoose.Schema.Types.ObjectId,
    //      },
    //      sum:{
    //         type:Number,
    //         default:1
    //      },
    // }]
  },
  {
    versionKey: false, //kaAsher anu yozrim object prodact hadash mitvasef la-object mishtane -> __v, pkuda zo mevatelet ota
    toJSON:{virtuals:true},
    id: false
  }
);
CustomerShema.pre("save", async function (next) {
    console.log('saveeeeeeeee');
  this.password = await bcrypt.hash(this.password, 8);
  console.log(this.password);
    next();
});

CustomerShema.virtual("ordersProducts",{
    ref:"Product",
    localField:"productId",
    foreignField: "_id",   
    justOne: true
});

const Customer = mongoose.model("Customer", CustomerShema, "customers"); //yozrim et amodel(et amuzar), (1-ma anu rozim lizor, 2-validaziA(bdikot), 3-le-Eyze collection(detabase) leOsif)

module.exports = Customer;