import express from 'express';
import {inventory} from '../Inventory.js';

export const routerProductsApi = express.Router();
export const routerProductsView = express.Router();

/* API */
routerProductsApi.get('/listar', (req, res) => {
  const productos = inventory.getProducts();
  if(!productos.length) return res.json({error: 'no hay productos cargados'})
  res.json(productos)
});

routerProductsApi.get('/listar/:id', (req, res) => {
  const producto = inventory.getProduct(req.params.id);
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto)
});

routerProductsApi.post('/guardar', (req, res) => {
  const {title, price, thumbnail} = req.body;
  if(!title || !price || !thumbnail) return res.json({error: 'faltan parametros'})
  const productoNuevo = inventory.addProduct(title, price, thumbnail);
  if(!productoNuevo) return res.json({error: 'error al guardar producto'})
  res.redirect('/')
});

routerProductsApi.put('/actualizar/:id', (req, res) => {
  const {title, price, thumbnail} = req.body;
  if(!title || !price || !thumbnail) return res.json({error: 'faltan parametros'})
  const producto = inventory.updateProduct(Number(req.params.id), title, price, thumbnail);
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto);
});

routerProductsApi.delete('/borrar/:id', (req, res) => {
  const producto = inventory.deleteProduct(Number(req.params.id));
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto);
});
/* API */

/* VIEWS */
routerProductsView.get('/vista', (req, res) => {
  const products = inventory.getProducts();
  res.render('products', {products, productsExists: products.length > 0});
})
/* VIEWS */