//kol peUla hishuvit mitbazeA ba-module aze kaAsher mekablim et anetunim mi-database

const Store = require("../product/store");
const Order = require("../product/order-detail");
const Category = require("../product/Category");
const Image = require("../product/images");
const { async } = require("rxjs");
// var ObjectID = require("mongodb").ObjectID;

function getAllStoreAsync() {
  return Store.find().exec(); //exec()-> function return promis
}

//findeOne() benigud la-find() mehapeset object/mishtane ehad she-mekayem et Atnay (object ehad lefi atnay she anu mahnisim la-())
// find() anu mehapsim object she mekayem et atnay: ({_id:_id}) - mehapes object ehad she A-_id shelo shave la-_id sheba huz-(_id)
// *be javascript nitan lorshom bimkom find(({_id:_id})) -> find(({_id}))
// _id shemibahuz(shemitkabel from out - getOneProductAsync(_id)) hu string, ve _id mongodb hu object lahen hayinu zrihim lirshom find({find:mongodb.ObjectId._id}), aval mongoose otomati memir et astring laobject, lahen anu roshmim yashar betor string -> find(_id)
function getOneStoreByIdAsync(_id) {
  return Store.findOne({ _id }).exec();
}

function addStoreAsync(product) {
  return product.save();
}

async function upddateProductAsync(product) {
  const info = await Store.updateOne({ _id: product._id }, product).exec(); //updateOne() A-exec() lo mahzira object product ela object shel meyda(info) lahen afunction hi async
  return info.matchedCount > 0 ? product : null; //info.matchedCount: im product nimza
}

function deleteStoreAsync(_id) {
  return Store.deleteOne({ _id }).exec();
}

//shayilta:(pkudot shel amesed netunim)
// sql: select... from... where price>=minPrice and price<=maxPrice.
// (mongodb) comparsion query operation:
//$gt Greater than
//$gte Greater than or equal
//$lt: lower than
//$lte: lower  than or equal
//$eq:equal
//$ne: not equal
//$in: in
//$in: not in
//$or: or

function getAllProductByRangeAsync(minPrice, maxPrice) {
  //range-tvah function that get only products that price between minPrice and maxPrice
  return Store.find({ price: { $gte: minPrice, $lte: maxPrice } }, null, {
    sort: { price: -1, name: 1 },
  }).exec();
  // parameter 2 -> null mean get all data(mishtanim), if we want spisifice deta -> [name ,price] -> get product with only name and price deta
  // parapeter 3 -> sort mean lemayen, lefi seder price (-1 mean beseder yored - me-agadol la-namuh), and im price oto mehir az temayen li lefi name (1 mean lefi a-z)
}

// relation key(kishur beyn mesed netunim)
// function that meziga(show) et Acategory lefi AcategoryId shel amuzar(product)
function getAllProductWithCategoryAsync() {
  return Store.find({}).populate("category").exec();
  //kodem anu mekablim et kol amozarim she-anu mehaosim(bedugma zo- all products)
  // pkudat A-populate mosifa/meAhleset et Asade avirtuali-'category' kemishtene la-product ve-baMishte aze yazig(show) et kol aobject category shelo lefi categoryId   (sade virtuali- ma ayehasim beyn acollectipns)
}

//function show all categories and for one categry show all products he have (*afuh me Afunction she-lemaAla)
function getAllCategoryWithHisProductsAsync() {
  return Category.find({}).populate("products").exec();
}

async function getAllProductsWithImeges() {
  return Store.find({}).populate("images").populate("").exec();
}
async function getAllProductsOfOneCategoryWithImeges(categoryId) {
  return Store.find({ categoryId: categoryId }).populate("images").exec();
}

// async function getAllProductsWithImeges2(){
//   let prodacts=await Product.find().exec(); //exec()-> function return promis
//   for (let i = 0; i < prodacts.length; i++) {
//     let images=await Image.find({productId:prodacts[i]._id},["path"]).exec();
//     if(images.length===0){
//       continue;
//     }
//     // console.log(images);
//     prodacts[i].images=images;
//     console.log(prodacts[i].images);
//   }
//   // console.log(prodacts);
//   return prodacts;
// }

module.exports = {
  getAllStoreAsync,
  getOneStoreByIdAsync,
  addStoreAsync,
  upddateProductAsync,
  deleteStoreAsync,
  getAllProductByRangeAsync,
  getAllProductWithCategoryAsync,
  getAllCategoryWithHisProductsAsync,
  getAllProductsWithImeges,
  getAllProductsOfOneCategoryWithImeges,
};
