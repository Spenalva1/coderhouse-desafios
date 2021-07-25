import express from 'express';
import Inventory from './Inventory.js'

const PUERTO = 8080;
const inventory = new Inventory();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/productos/listar', (req, res) => {
  const productos = inventory.getProducts();
  if(!productos.length) return res.json({error: 'no hay productos cargados'})
  res.json({productos})
});

app.get('/api/productos/listar/:id', (req, res) => {
  const producto = inventory.getProduct(req.params.id);
  if(!producto) {
    return res.json({error: 'producto no encontrado'})
  }
  res.json({producto})
});

app.post('/api/productos/guardar', (req, res) => {
  const {title, price, thumbnail} = req.body;
  if(!title || !price || !thumbnail) return res.json({error: 'faltan parametros'})
  const productoNuevo = inventory.addProduct(title, price, thumbnail);
  if(!productoNuevo) return res.json({error: 'error al guardar producto'})
  res.json({productoNuevo})
});


const server = app.listen(PUERTO || 8080, () => {
  console.log(`Servidor inicializado en el puerto ${PUERTO}.`);
})

server.on('error', () => {
  console.log('Error del servidor.');
})