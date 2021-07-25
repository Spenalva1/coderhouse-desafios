const express = require('express');
const Inventory = require('./Inventory.js');

const PUERTO = 8080;
const inventory = new Inventory();

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
const routerProductsApi = express.Router();
const routerProductsView = express.Router();

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

/* SOCKETS */
io.on('connection', (socket) => {
  console.log('nuevo cliente conectado');

  socket.emit('products', inventory.getProducts())

  socket.on('productAdd', data => {
    const {title, price, thumbnail} = data;
    inventory.addProduct(title, price, thumbnail);
    io.sockets.emit('products', inventory.getProducts());
  })
})
/* SOCKETS */


app.use('/api/productos', routerProductsApi);
app.use('/productos', routerProductsView);

const server = http.listen(PUERTO || 8080, () => {
  console.log(`Servidor inicializado en el puerto ${PUERTO}.`);
})

server.on('error', () => {
  console.log('Error del servidor.');
})