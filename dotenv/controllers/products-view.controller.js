const { productTestController } = require('../api-test/products');
const ProductDAO = require('../dao/factory.js').getDAO();

async function listProductsView(req, res) {
  const products = await ProductDAO.findAll();
  res.render('products', {
    products,
    productsExists: products.length > 0,
    name: req.user?.username,
    email: req.user?.email,
    photo: req.user?.photo,
    userExists: !!req.user?.username,
  });
}

async function listProductsViewTest(req, res) {
  const cantParam = Number(req.query?.cant);
  const cant = !isNaN(cantParam) ? cantParam : 10;
  const products = await productTestController.findAll(cant);
  res.render('products', { products, productsExists: products.length > 0 });
}

module.exports = { listProductsView, listProductsViewTest };
