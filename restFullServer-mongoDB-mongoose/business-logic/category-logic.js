//kol peUla hishuvit mitbazeA ba-module aze kaAsher mekablim et anetunim mi-database

const Product = require("../product/product");
const Order = require("../product/order-detail");
const Category = require("../product/Category");
const Image = require("../product/images");
const { async } = require("rxjs");
// var ObjectID = require("mongodb").ObjectID;

function getAllCategoryAsync() {
  return Category.find().exec();
}

async function getListCategoryAsync(AllCategories, parentId = null) {
  let categoryList = [];
  let category;
  if (parentId) {
    category = await Category.find({ parentId: parentId }).exec();
  } else {
    category = AllCategories.filter((cat) => cat.parentId == undefined);
  }

  // console.log(category);
  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      children: await getListCategoryAsync(AllCategories, cat._id),
    });
  }
  // let category;
  return categoryList;
}

async function getAllProductsOfOneCategoryWithImeges(categoryId) {
  // console.log(categoryId + "shibellll");
  return await Product.find({ categoryId: categoryId })
    .populate("images")
    .exec();
}

async function getAllProductsOfCategoryWithImeges(categoryId) {

  let productsArr = [];
  let withoutChildren = [];
  let arr = [];

  let move = (await Category.find({ parentId: categoryId }));
  move.forEach((cat) => arr.push(cat));

  if (move.length <= 0) {
    withoutChildren.push(await Category.findOne({_id: categoryId}));
  }

  while (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      let test = await Category.find({ parentId: arr[i]._id });
      if (test.length <= 0) {
        withoutChildren.push(arr[i]);
        arr.filter((category) => category._id != arr[i]._id);
      }
    }
    arr = await getChildren(arr);
  }

  
  for (let j = 0; j < withoutChildren.length; j++) {
    let arr5 = [];
    arr5 = await getAllProductsOfOneCategoryWithImeges(withoutChildren[j]._id);
    arr5.forEach((prod) => productsArr.push(prod));
  }
  return productsArr;
}

function getChildern(categoryId){
  return Category.find({parentId:categoryId}).exec();
}
async function getProducts(categoryId){
  let childrens= await getChildern(categoryId);
  let parentsCategory=[];
  let lastCategory=[];
  let productsList=[];
  if(childrens.length>0){
      for (let i = 0; i < childrens.length; i++) {
        // debugger;
          const thisChildren=await getChildern(childrens[i]._id);
          // console.log(childrens[i]._id);
          if(thisChildren.length>0){
            for (let j = 0; j < thisChildren.length; j++) {
              parentsCategory.push(thisChildren[j]);
            }
          }else{
              lastCategory.push(childrens[i]);
          }
          if(i===childrens.length-1){
            console.log(i);
            console.log(parentsCategory);
            console.log(childrens);

              childrens=parentsCategory;
              parentsCategory=[];
              i=-1;
          }

      }
  }else{
      lastCategory.push(categoryId);
  }
  console.log(12);
  
  for (let i = 0; i < lastCategory.length; i++) {
      let productsArr=await getAllProductsOfOneCategoryWithImeges(lastCategory[i]);
      for(let p of productsArr){
          productsList.push(p);
      }
  }
  return productsList;
}

async function getChildren(categories) {
  let arr = [];
  for (let i = 0; i < categories.length; i++) {
    let move = await Category.find({ parentId: categories[i]._id })
    move.forEach((cat) => arr.push(cat));
    }

  return arr;
}
// while(childrenCategory.length > 0) {

// }
// return

// let productList=[];
// let products;
// if(childrenCategory.length>0){
//   for(let c of childrenCategory){
//     products= await getAllProductsOfCategoryWithImeges(c._id);
//   }
// }else{
//   products= await getAllProductsOfOneCategoryWithImeges(categoryId)
// }
// console.log(products);
// for(let p of products){
//   productList.push(p);
// }
// return productList;

async function getChildrenCategoryAsync(categoryId) {
  return Category.find({ parentId: categoryId }).exec();
}
function getMainCategoryAsync() {
  return Category.find({ parentId: undefined }).exec();
}

function getOneCategoryAsync(_id) {
  return Category.findOne({ _id }).exec();
}

function addCategoryAsync(category) {
  return category.save();
}

async function upddateCategoryAsync(category) {
  const info = await Category.updateOne({ _id: category._id }, category).exec(); //updateOne() A-exec() lo mahzira object product ela object shel meyda(info) lahen afunction hi async
  return info.matchedCount > 0 ? category : null; //info.matchedCount: im product nimza
}

function deleteproductAsync(_id) {
  return Category.deleteOne({ _id }).exec();
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

// relation key(kishur beyn mesed netunim)
// function that meziga(show) et Acategory lefi AcategoryId shel amuzar(product)

//function show all categories and for one categry show all products he have (*afuh me Afunction she-lemaAla)
function getAllCategoryWithHisProductsAsync() {
  return Category.find({}).populate("products").exec();
}

module.exports = {
  getAllCategoryAsync,
  getOneCategoryAsync,
  addCategoryAsync,
  upddateCategoryAsync,
  deleteproductAsync,
  getAllCategoryWithHisProductsAsync,
  getListCategoryAsync,
  getAllProductsOfCategoryWithImeges,
  getProducts,
};

// for (let i = 0; i < arr.length; i++) {
//   console.log(i)
//   let bool = await Category.find({ parentId: arr[0]._id });
//   // console.log(bool)

//   if (bool.length <= 0) {
//     console.log("arr");

//     //doesnt have children
//     withoutChildren.push(arr.splice(i, 1));
//   } else {
//     // console.log('r')
//     let q =

//     arr2.push
//     arr2.filter((category) => category._id != arr[i]._id );
//     console.log(arr2 + 'aaaaaa')
//   }
// }

// for (let j = 0; j < productsArr.length; j++) {
//   productsArr.push(
//     await getAllProductsOfOneCategoryWithImeges(productsArr[j]._id)
//   );
// }
// console.log(productsArr);
// return productsArr;
//
