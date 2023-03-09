const ProductLogic = require("../business-logic/product-logic");
const Images=require("../product/images");
const ImagesLogic=require("../business-logic/imageLogic");

const express = require("express");
const router = express.Router(); 
const fs=require("fs");
const fileUpload = require("express-fileupload");
const uuid = require("uuid");
const { request } = require("http");
const { async } = require("rxjs");

router.get("/", async (request, response) => {
    try {
      const Images = await ImagesLogic.getAllImageAsync();
      response.json(Images); 
    } catch (err) {
      response.status(500).send(err.message); 
    }});

// router.get("/", async (request, response) => {
//     try {
//         const Images = await ImagesLogic.getAllImageAsync();
//         response.json(Images); 
//     } catch (err) {
//         response.status(500).send(err.message); 
// }});

router.post("/", async (request, response) => {
    try {
        if(!request.body.productId){ //productId, path 
            response.status(400).send(`productId`);
            return;
        }
        const image = new Images(request.body); //request.body= {productId:(mongoose-_id) , path}

        // console.log(order);
        await image.validate();

        console.log(image);  

        //save:
        await ImagesLogic.addNewImageAsync(image);

        response.send();
    } catch (err) {
        if (err._message == "image validation failed") {
            response.status(400).send(err.message);
            return;
          }
          response.status(500).send(err.message);
    }
});

router.post("/upload-image", (request, response) => {
    try {     
        console.log(request.body);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(request.files);
        if (!request.files) {
            // bodek im auser choose/upload image/file
            response.status(400).send("no image sent!");
            return;
        }
        
        // const cat
        const file = request.files.mySingleImage; //object shel file
        const nameFile=uuid.v4();
        const extension = file.name.substring(file.name.lastIndexOf(".")); //extension -> siyomet kovetz (.gpj, .txt, ... )
        file.mv("C:\\Users\\Alex\\App\\AppAn\\src\\assets\\product-images\\" + nameFile + extension); //function that tae the file and save/move to our folder(tikiya)
        console.log("success");
        response.status(200).send(nameFile + extension);
    } catch (error) {
        console.log("noo success");
        response.status(500).send(err.message);
    }
});

router.post("/delete-image-file",async(request,response)=>{
    const path="C:\\Users\\Alex\\App\\AppAn\\src\\assets\\product-images\\"+request.body.path;
    
    console.log(path);
    fs.unlink(path,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });  

});
    
router.delete("/:_id", async (request, response) => {
    try {
      const _id = request.params._id;
      await ImagesLogic.deleteproductAsync(_id);
      response.sendStatus(204);
    } catch (err) {
      response.status(500).send(err.massage);
    }
});

module.exports = router;
