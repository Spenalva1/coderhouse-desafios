import express from 'express';
import Product from '../models/Product.js';

export const routerProductsApi = express.Router();
export const routerProductsView = express.Router();

/* API */
routerProductsApi.get('/listar', async (req, res) => {
  const productos = await Product.getProducts();
  if(!productos.length) return res.json({error: 'no hay productos cargados'})
  res.json(productos)
});

routerProductsApi.get('/listar/:id', async (req, res) => {
  const producto = await Product.getProduct(req.params.id);
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto)
});

routerProductsApi.post('/guardar', async (req, res) => {
  const {title, price, thumbnail} = req.body;
  if(!title || !price || !thumbnail) return res.json({error: 'faltan parametros'})
  const productoNuevo = await Product.addProduct(title, price, thumbnail);
  if(!productoNuevo) return res.json({error: 'error al guardar producto'})
  res.redirect('/')
});

routerProductsApi.put('/actualizar/:id', async (req, res) => {
  const {title, price, thumbnail} = req.body;
  if(!title || !price || !thumbnail) return res.json({error: 'faltan parametros'})
  const producto = await Product.updateProduct(Number(req.params.id), title, price, thumbnail);
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto);
});

routerProductsApi.delete('/borrar/:id', async (req, res) => {
  const producto = await Product.deleteProduct(Number(req.params.id));
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto);
});
/* API */

/* VIEWS */
routerProductsView.get('/vista', async (req, res) => {
  const products = await Product.getProducts();
  res.render('products', {products, productsExists: products.length > 0});
})
/* VIEWS */