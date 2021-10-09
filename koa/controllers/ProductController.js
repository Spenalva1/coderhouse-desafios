const ProductDAO = require('../dao/factory.js').getDAO();

async function listProducts(ctx) {
  try {
    const products = await ProductDAO.findAll();
    if (!products?.length) {
      ctx.status = 400;
      return (ctx.body = { error: 'no hay productos cargados' });
    }
    ctx.body = products;
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = { error: error.message });
  }
}

async function getProduct(ctx) {
  try {
    const product = await ProductDAO.findById(ctx.params.id);
    if (!product) {
      ctx.status = 400;
      return (ctx.body = { error: 'producto no encontrado' });
    }
    ctx.body = product;
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = { error: error.message });
  }
}

async function createProduct(ctx) {
  try {
    const { title, price, thumbnail } = ctx.request.body;
    if (!title || !price || !thumbnail) {
      ctx.status = 401;
      return (ctx.body = { error: 'faltan parametros' });
    }
    const newProduct = await ProductDAO.create({
      title,
      price,
      thumbnail,
    });
    if (!newProduct) {
      ctx.status = 500;
      return (ctx.body = { error: 'error al guardar producto' });
    }
    ctx.status = 201;
    ctx.body = newProduct;
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = { error: error.message });
  }
}

async function updateProduct(ctx) {
  try {
    const { title, price, thumbnail } = ctx.request.body;
    if (!title || !price || !thumbnail) {
      ctx.status = 401;
      return (ctx.body = { error: 'faltan parametros' });
    }
    const product = await ProductDAO.update(ctx.params.id, {
      title,
      price,
      thumbnail,
    });
    if (!product) {
      ctx.status = 400;
      return (ctx.body = { error: 'producto no encontrado' });
    }
    ctx.status = 201;
    ctx.body = product;
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = { error: error.message });
  }
}

async function deleteProduct(ctx) {
  try {
    const product = await ProductDAO.delete(ctx.params.id);
    if (!product) {
      ctx.status = 400;
      return (ctx.body = { error: 'producto no encontrado' });
    }
    ctx.body = product;
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = { error: error.message });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
