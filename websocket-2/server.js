import express from 'express';
import httpModule from 'http';
import moment from 'moment';
import {Server} from 'socket.io';
import  { inventory } from './Inventory.js';
import  ChatStorage  from './storage/ChatStorage.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {routerProductsApi, routerProductsView} from './routes/products.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

const PUERTO = 8080;

const chatStorage = new ChatStorage(__dirname + '/storage/chat.txt')

const messages = [];
chatStorage.read().then(data => {
  messages.push(...data);
});

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
io.on('connection', (socket) => {
  console.log('nuevo cliente conectado');

  socket.emit('products', inventory.getProducts());

  socket.emit('messages', messages);

  socket.on('productAdd', data => {
    const {title, price, thumbnail} = data;
    inventory.addProduct(title, price, thumbnail);
    io.sockets.emit('products', inventory.getProducts());
  })

  socket.on('message', data => {
    const {author, message} = data;
    messages.push({author, message, date: moment(new Date()).format('DD/MM/YYY HH:mm:ss')});
    chatStorage.save(messages);
    io.sockets.emit('messages', messages);
  })
})
/* SOCKETS */

const server = http.listen(PUERTO || 8080, () => {
  console.log(`Servidor inicializado en el puerto ${PUERTO}.`);
})

server.on('error', () => {
  console.log('Error del servidor.');
})