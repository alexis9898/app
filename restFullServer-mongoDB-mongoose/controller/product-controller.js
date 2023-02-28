//Aazana le-bakasha shel alakoAh
//kmo server

const { request, response } = require("express");
const express = require("express");
const { async } = require("rxjs");
const productLogic = require("../business-logic/product-logic");
// const { products } = require("../detabase/db");
const Product = require("../product/product");

const router = express.Router(); //kmo server

//get all product
router.get("/", async (request, response) => {
  try {
    const products = await productLogic.getAllProductAsync();
    response.json(products); //mahzir array of object
  } catch (err) {
    response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//post(add) full product
router.post("/", async (request, response) => {
  try {
    const product = new Product(request.body);
    
    await product.validate();
    
    const addProduct = await productLogic.addProductAsync(product);
    console.log("++++++++++++++++++00");
    
    response.status(201).json(addProduct);
  
  } catch (err) {
    if(err._message=="Product validation failed"){
        response.status(400).send(err.message);
        return;
    }
    response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  // return;
  }
});


//updatte Full product
router.put("/:_id", async (request, response) => {
  try {
    const product = new Product(
      request.body
    );
      product._id=request.params._id;

     await product.validate();
      

    const productUpdate = await productLogic.upddateProductAsync(product);
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

//updatte partial(helki) product
router.patch("/:_id", async (request, response) => {
  try {
    const product = new Product(
      request.body
    );
    product._id=request.params._id;
    const productUpdate = await productLogic.upddateProductAsync(
      product
    );

    if (!productUpdate) {
      //product not found(id not exist)
      response.sendStatus(404);
      return;
    }
    response.json(productUpdate);
  } catch (err) {
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//delete product
router.delete("/:_id", async (request, response) => {
  //od shita lefakeAh al id al-yedey rgx(betoh a-(), ahrey id nevazeA bdika)
  try {
    const _id = request.params._id;
    await productLogic.deleteproductAsync(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//get all product with his category
router.get("/p-with-his-category", async (request, response) => {
  try {
    const products = await productLogic.getAllProductWithCategoryAsync();
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//get all category with all his products
router.get("/category-with-his-product", async (request, response) => {
  try {
    const products = await productLogic.getAllCategoryWithHisProductsAsync();
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

router.get("/all-products-with-images", async (request, response) => {
  try {
    const products = await productLogic.getAllProductsWithImeges();
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

router.post("/get-products-of-category-with-images", async (request, response) => {
  try {
    const category=request.body.categoryId;
    console.log(request.body);
    if(!category){
      response.sendStatus(404).send("need categoryId");
      return;
    }

    const products = await productLogic.getAllProductsOfOneCategoryWithImeges(category);
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

    const Findproduct = await productLogic.getOneProductAsync(_id);
    if (!Findproduct) {
      //product not found(id not exist)
      response.sendStatus(404); //rout not found
      return; //im lo nevatzeA return az gam A-rsponse aba itbazeA
    }
    response.json(Findproduct);
  } catch (err) {
    response.status(500).send(err); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});
//get all product by price range
router.get(
  "/only-by-range-price/:minPrice/:maxPrice",
  async (request, response) => {
    try {
      const minPrice = +request.params.minPrice; //+ -> parse to int
      const maxPrice = +request.params.maxPrice;
      const products = await productLogic.getAllProductByRangeAsync(minPrice,maxPrice);
      response.json(products); //mahzir array of object
    } catch (err) {
      response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
    }
  }
);


module.exports = router;
