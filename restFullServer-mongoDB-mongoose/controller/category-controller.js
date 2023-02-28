//Aazana le-bakasha shel alakoAh
//kmo server

const { request, response } = require("express");
const express = require("express");
const { async } = require("rxjs");
const CategoryLogic = require("../business-logic/category-logic");
// const { products } = require("../detabase/db");
const Category = require("../product/Category");
const productLogic=require("../product/product");

const router = express.Router(); //kmo server

//get all product
router.get("/", async (request, response) => {
  try {
    const categories = await CategoryLogic.getAllCategoryAsync();
    response.json(categories); //mahzir array of object
  } catch (err) {
    response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//post(add) full product
router.post("/", async (request, response) => {
  try {
    const category = new Category(request.body);
    
    await category.validate();
    
    const addCategory = await CategoryLogic.addCategoryAsync(category);
    console.log("++++++++++++++++++00");
    
    response.status(201).json(addCategory);
  
  } catch (err) {
    if(err._message=="Product validation failed"){
        response.status(400).send(err.message);
        return;
    }
    response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  // return;
  }
});

//get category with his children(tat-category)
router.post(
  "/get-list-category",
  async (request, response) => {
    try {
      let categories=await CategoryLogic.getAllCategoryAsync();
      let category=await CategoryLogic.getOneCategoryAsync(request.body.categoryId); //if we want spicific category need to send categoryId
      let categoryList;
      if(!category){
        categoryList= await CategoryLogic.getListCategoryAsync(categories);
        response.json(categoryList);
        return;
      }
      console.log(category);
      categoryList=await CategoryLogic.getListCategoryAsync(categories,request.body.categoryId);
      response.json(categoryList);
    } catch (err) {
      response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
    }
  }
);



//updatte Full product
router.put("/:_id", async (request, response) => {
  try {
    const product = new Category(
      request.body
    );
      product._id=request.params._id;

     await product.validate();
      

    const productUpdate = await CategoryLogic.upddateProductAsync(product);
    if (!productUpdate) {
      //product not found(id not exist)
      response.sendStatus(404);
      return;
    }
    response.json(productUpdate);
  } catch (err) {
    if(err._message=="Product validation failed"){
      response.status(400).send(err.message);
      return;
  }
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//updatte partial(helki) category
router.patch("/:_id", async (request, response) => {
  try {
    const category = new Category(
      request.body
    );
    category._id=request.params._id;
    const CategoryUpdate = await CategoryLogic.upddateCategoryAsync(
      category
    );

    if (!CategoryUpdate) {
      //product not found(id not exist)
      response.sendStatus(404);
      return;
    }
    response.json(CategoryUpdate);
  } catch (err) {
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//delete product
router.delete("/:_id", async (request, response) => {
  //od shita lefakeAh al id al-yedey rgx(betoh a-(), ahrey id nevazeA bdika)
  try {
    const _id = request.params._id;
    await CategoryLogic.deleteproductAsync(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//get all product with his category
router.get("/p-with-his-category", async (request, response) => {
  try {
    const products = await CategoryLogic.getAllProductWithCategoryAsync();
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//get all category with all his products
router.get("/category-with-his-product", async (request, response) => {
  try {
    const products = await CategoryLogic.getAllCategoryWithHisProductsAsync();
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});


router.post("/get-products-of-category-with-images", async (request, response) => {
  try {
    const category=request.body.categoryId;
    console.log("request.body");
    console.log(request.body);
    if(!category){
      response.sendStatus(404).send("need categoryId");
      return;
    }

    const products = await CategoryLogic.getProducts(category);
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

// get one product
router.get("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;

    const FindCategory = await CategoryLogic.getOneCategoryAsync(_id);
    if (!FindCategory) {
      response.sendStatus(404);
      return; 
    }
    response.json(FindCategory);
  } catch (err) {
    response.status(500).send(err); 
  }
});


module.exports = router;
