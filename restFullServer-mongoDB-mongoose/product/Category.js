const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

//category of store or another category(tat-category)

const CategoryShema = mongoose.Schema(
  {
    name: {
     type: String,
     required:[true, "is missing"]
    },
    parentId:{
      type:mongoose.Schema.ObjectId,
    },
    discriptin:{
      type:String
    }
  },
  {
    versionKey: false, //kaAsher anu yozrim object prodact hadash mitvasef la-object mishtane -> __v, pkuda zo mevatelet ota
    toJSON:{virtuals:true},
    id: false
  }
);

CategoryShema.virtual("products",{
    ref:"Product",
    localField:"_id",
    foreignField: "categoryId"
});

const Category = mongoose.model("Category", CategoryShema, "categories"); //yozrim et amodel(et amuzar), (1-ma anu rozim lizor, 2-validaziA(bdikot), 3-le-Eyze collection(detabase) leOsif)

module.exports = Category;
