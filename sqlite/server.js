import express from 'express';
import httpModule from 'http';
import moment from 'moment';
import {Server} from 'socket.io';
import Product from './models/Product.js';
import Chat from './models/Chat.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {routerProductsApi, routerProductsView} from './routes/products.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

const PUERTO = 8080;

const app = express();
const http = httpModule.Server(app);
const io = new Server(http);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/api/productos', routerProductsApi);
app.use('/productos', routerProductsView);

/* SOCKETS */
io.on('connection', async (socket) => {
  console.log('nuevo cliente conectado');

  socket.emit('products', await Product.getProducts());

  socket.emit('messages', await Chat.read());

  socket.on('productAdd', async (data) => {
    const {title, price, thumbnail} = data;
    const productoNuevo = await Product.addProduct(title, price, thumbnail);
    io.sockets.emit('product', productoNuevo);
  })

  socket.on('message', async (data) => {
    const {author, message} = data;
    const newMessage = {author, message, date: moment(new Date()).format('DD/MM/YYY HH:mm:ss')}
    await Chat.addMessage(newMessage.author, newMessage.message, newMessage.date)
    io.sockets.emit('message', newMessage);
  })
})
/* SOCKETS */

const server = http.listen(PUERTO || 8080, () => {
  Chat.start();
  console.log(`Servidor inicializado en el puerto ${PUERTO}.`);
})

server.on('error', () => {
  console.log('Error del servidor.');
})