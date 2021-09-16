const logger = require('../lib/logger.js');
const Product = require('../models/Product.js');

async function listProducts(req, res) {
  try {
    const products = await Product.find({});
    if (!products.length)
      return res.status(404).json({ error: 'no hay productos cargados' });
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail)
      return res.json({ error: 'faltan parametros' });
    const newProduct = await Product.create({
      title,
      price,
      thumbnail,
    });
    if (!newProduct) {
      logger.log('error', 'Error al guardar un nuevo producto.');
      return res.status(500).json({ error: 'error al guardar producto' });
    }
    logger.log(
      'info',
      'Nuevo producto guardado con éxito. id ' + newProduct._id
    );
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    logger.log('error', 'Error al guardar un nuevo producto.');
    return res.status(500).send({ error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail)
      return res.json({ error: 'faltan parametros' });
    const product = await Product.findByIdAndUpdate(req.params.id, {
      title,
      price,
      thumbnail,
    });
    if (!product) {
      return res.status(404).json({ error: 'producto no encontrado' });
    }
    logger.log('info', `Producto ${product._id} actualizado con éxito.`);
    res.status(201).json({ title, price, thumbnail, _id: req.params.id });
  } catch (error) {
    logger.log('error', 'Error al actualizar un producto.');
    return res.status(500).send({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ error: 'producto no encontrado' });
    logger.log('info', `Producto ${product._id} eliminado con éxito.`);
    res.status(200).json(product);
  } catch (error) {
    logger.log('error', 'Error al borrar un producto.');
    return res.status(500).send({ error: error.message });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
