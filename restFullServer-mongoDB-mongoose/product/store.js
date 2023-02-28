//product nivna lefi Amongoose (lefi model shel proomise):
const mongoose = require("mongoose");

const StoreShema = mongoose.Schema(
  {
    //  yozrim shema la- model(product) (ma amurliyot la-product ima asug sheli(shel kol mishtane))
    name: {
        type: String,
        required:[true, "is missing"],
    },
    discription:{
      type:String,
      default:""
    }
  },
  {
    versionKey: false, //kaAsher anu yozrim object prodact hadash mitvasef la-object mishtane -> __v, pkuda zo mevatelet ota
    toJSON: {virtuals: true}, //kaAsher AmaArehet(system) mamira le-JSON, anu meAshrim to be sade virtual
    id:false  // brirat mehdal shel system- potahat mishtene id , pkuda zo mevatelet ota ki yesh lanu _id le Category
  }
);

// StoreShema.virtual("category",{ //sade virtual- magdir hibur/kishur/relation beyn collections(magdir key rashi le-key mishni), aparameter 1-> shem shel Asade Avirtual  
//     ref:"Category", //im mi yesh lanu relations(yehasim)-> shem Amodel
//     localField:"categoryId", //Amishtane(data) Amishny ba-Product
//     foreignField: "_id", //Amishtane(data) Arashi ba-Category  
//     justOne: true //mavi obyect ehad velo array (pkuda doma la-{ $unwind: "$category" } be function aggragate() she metaEret relations be mongoDB)
// });

// StoreShema.virtual("customers",{
//   ref:"Customer",
//   localField:"_id",
//   foreignField: "productId"
// });

// StoreShema.virtual("images",{
//   ref:"Images",
//   localField:"_id",
//   foreignField: "productId"
// });

const Store = mongoose.model("Store", StoreShema, "stores"); //yozrim et amodel(et amuzar), (1-ma anu rozim lizor, 2-validaziA(bdikot), 3-le-Eyze collection(detabase) leOsif)

module.exports = Store;
