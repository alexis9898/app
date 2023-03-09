const Customer = require("../product/customer");
const Product = require("../product/product");
const OrderDetail = require("../product/order-detail");
const Image = require("../product/images");

async function addNewImageAsync(image) {
    return image.save();
}

async function getAllImageAsync(image) {
  return Image.find().exec(); //exec()-> function return promis
}
function getImagesAsync(productId) {
  return Image.find().exec(); //exec()-> function return promis
}
function findProductAllImageAsync(image) {
    return Image.find().exec(); //exec()-> function return promis
}
function deleteproductAsync(_id){
  return Image.deleteOne({ _id }).exec();

}

module.exports={
    addNewImageAsync,
    getAllImageAsync,
    findProductAllImageAsync,
    deleteproductAsync,
    getImagesAsync
}