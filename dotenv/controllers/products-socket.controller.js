const ProductDAO = require('../dao/factory.js').getDAO();

async function getProductsSocket() {
  return await ProductDAO.findAll();
}

async function createProductSocket(io, data) {
  const { title, price, thumbnail } = data;
  const newProduct = await ProductDAO.create({
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
