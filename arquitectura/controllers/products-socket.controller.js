const persistence = require('../persistence/factory.js').getPersistence();

async function getProductsSocket() {
  return await persistence.findAll('product');
}

async function createProductSocket(io, data) {
  const { title, price, thumbnail } = data;
  const newProduct = await persistence.create('product', {
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
