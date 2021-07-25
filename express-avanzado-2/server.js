const express = require('express');
const Inventory = require('./Inventory.js');

const PUERTO = 8080;
const inventory = new Inventory();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
const routerProducts = express.Router();

routerProducts.get('/listar', (req, res) => {
  const productos = inventory.getProducts();
  if(!productos.length) return res.json({error: 'no hay productos cargados'})
  res.json(productos)
});

routerProducts.get('/listar/:id', (req, res) => {
  const producto = inventory.getProduct(req.params.id);
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto)
});

routerProducts.post('/guardar', (req, res) => {
  const {title, price, thumbnail} = req.body;
  if(!title || !price || !thumbnail) return res.json({error: 'faltan parametros'})
  const productoNuevo = inventory.addProduct(title, price, thumbnail);
  if(!productoNuevo) return res.json({error: 'error al guardar producto'})
  res.json(productoNuevo)
});

routerProducts.put('/actualizar/:id', (req, res) => {
  const {title, price, thumbnail} = req.body;
  if(!title || !price || !thumbnail) return res.json({error: 'faltan parametros'})
  const producto = inventory.updateProduct(Number(req.params.id), title, price, thumbnail);
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto);
});

routerProducts.delete('/borrar/:id', (req, res) => {
  const producto = inventory.deleteProduct(Number(req.params.id));
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json(producto);
});


app.use('/api/productos', routerProducts);

const server = app.listen(PUERTO || 8080, () => {
  console.log(`Servidor inicializado en el puerto ${PUERTO}.`);
})

server.on('error', () => {
  console.log('Error del servidor.');
})