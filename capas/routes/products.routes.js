const express = require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn.js');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products-api.controller.js');
const {
  listProductsView,
  listProductsViewTest,
} = require('../controllers/products-view.controller.js');

const routerProductsApi = express.Router();
const routerProductsView = express.Router();

/* API */
routerProductsApi.get('/listar', listProducts);

routerProductsApi.get('/listar/:id', getProduct);

routerProductsApi.post('/guardar', createProduct);

routerProductsApi.put('/actualizar/:id', updateProduct);

routerProductsApi.delete('/borrar/:id', deleteProduct);
/* API */

/* VIEWS */
routerProductsView.get('/vista', isLoggedIn, listProductsView);

routerProductsView.get('/vista-test', listProductsViewTest);
/* VIEWS */

module.exports = {
  routerProductsApi,
  routerProductsView,
};
