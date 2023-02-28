//Aazana le-bakasha shel alakoAh
//kmo server

const { request, response } = require("express");
const express = require("express");
const { async } = require("rxjs");
const StoreLogic = require("../business-logic/store-logic");
// const { products } = require("../detabase/db");
const Store = require("../product/store");

const router = express.Router(); //kmo server

//get all product
router.get("/", async (request, response) => {
  try {
    const products = await StoreLogic.getAllStoreAsync();
    response.json(products); //mahzir array of object
  } catch (err) {
    response.status(500).send(err.message); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//post(add) full product
router.post("/", async (request, response) => {
  try {
    const store = new Store(request.body);
    
    await store.validate();
    
    const addStore = await StoreLogic.addStoreAsync(store);
    
    response.status(201).json(addStore);
  
  } catch (err) {
    if(err._message=="Store validation failed"){
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
    const product = new Store(
      request.body
    );
      product._id=request.params._id;

     await product.validate();
      

    const productUpdate = await StoreLogic.upddateProductAsync(product);
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
    const product = new Store(
      request.body
    );
    product._id=request.params._id;
    const productUpdate = await StoreLogic.upddateProductAsync(
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
    await StoreLogic.deleteproductAsync(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//get all product with his category
router.get("/p-with-his-category", async (request, response) => {
  try {
    const products = await StoreLogic.getAllProductWithCategoryAsync();
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

//get all category with all his products
router.get("/category-with-his-product", async (request, response) => {
  try {
    const products = await StoreLogic.getAllCategoryWithHisProductsAsync();
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

router.get("/all-products-with-images", async (request, response) => {
  try {
    const products = await StoreLogic.getAllProductsWithImeges();
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

    const products = await StoreLogic.getAllProductsOfOneCategoryWithImeges(category);
    response.json(products); //mahzir array of object
  } catch (err) {
    console.log(err);
    response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
  }
});

// get one Store
router.get("/:_id", async (request, response) => {
  try {
    const _id = request.params._id;

    const FindStore = await StoreLogic.getOneStoreByIdAsync(_id);
    if (!FindStore) {
      //product not found(id not exist)
      response.sendStatus(404); //rout not found
      return; //im lo nevatzeA return az gam A-rsponse aba itbazeA
    }
    response.json(FindStore);
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
      const products = await StoreLogic.getAllProductByRangeAsync(minPrice,maxPrice);
      response.json(products); //mahzir array of object
    } catch (err) {
      response.status(500).send(err.massage); //500-krisa (bedereh klal lo nishlah 'err,massage' she-lo ishlah netunim kmo me-date bass)
    }
  }
);


module.exports = router;
