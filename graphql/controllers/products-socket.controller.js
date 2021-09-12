const Product = require('../models/Product.js');

async function getProductsSocket() {
  return await Product.find({});
}

async function createProductSocket(io, data) {
  const { title, price, thumbnail } = data;
  const newProduct = await Product.create({
    title,
    price,
    thumbnail,
  });
  io.sockets.emit('product', newProduct);
}

module.exports = {
  getProductsSocket,
  createProductSocket,
};
