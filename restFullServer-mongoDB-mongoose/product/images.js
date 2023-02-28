//product nivna lefi Amongoose (lefi model shel proomise):
const mongoose = require("mongoose");

const ImagesShema = mongoose.Schema(
  {
    //  yozrim shema la- model(product) (ma amurliyot la-product ima asug sheli(shel kol mishtane))
    productId:{
      type: mongoose.Schema.Types.ObjectId, //asug shel data
      ref: "images", // shem Amodel we want relations 
      required:[true, "productId is missing"]
    },
     
    path:{
      type:String,
      required:[true, "path is missing"],
    }
  },
  {
    versionKey: false, //kaAsher anu yozrim object prodact hadash mitvasef la-object mishtane -> __v, pkuda zo mevatelet ota
    toJSON: {virtuals: true}, //kaAsher AmaArehet(system) mamira le-JSON, anu meAshrim to be sade virtual
    id:false  // brirat mehdal shel system- potahat mishtene id , pkuda zo mevatelet ota ki yesh lanu _id le Category
  }
);


ImagesShema.virtual("products",{
  ref:"Product",
  localField:"productId",
  foreignField: "_id"
});

const Images = mongoose.model("Images", ImagesShema, "images"); //yozrim et amodel(et amuzar), (1-ma anu rozim lizor, 2-validaziA(bdikot), 3-le-Eyze collection(detabase) leOsif)

module.exports = Images;
